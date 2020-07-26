import React, { useState } from "react";
var covariance = require('covariance')
var variance = require( 'compute-variance' );


function Calculator () {
  const [inputList, setInputList] = useState([{ stockTicker: "", weight: ""}]);
  const [beta, setBeta] = useState('')
  const [betaList, setBetaList] = useState('')

  const handleAddClick = () => {
    setInputList([...inputList, { stockTicker: "", weight: "" }]);
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  }

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }


  const getTickerData = async ticker => {
    let now = new Date()
    let end_time = Math.round(now.getTime() / 1000)
    let start_time = end_time - 31556926 * 3
    let upper_case_ticker = ticker.toUpperCase()
    let api_url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data?frequency=1d&filter=history&period1=${start_time}&period2=${end_time}&symbol=${upper_case_ticker}`

    let api_result = await fetch(api_url,
      {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          "x-rapidapi-key": "1c25da58f4msh79e4e0b3571706ep13b2c4jsnaf3c161e57d0"} })

    let res_json = await api_result.json()
    return res_json.prices
  }

  const calculateRtn = (close) => {
    let closeToday = close.slice(1)
    let closeTmr = close.slice(0, -1)
    let rtn = closeTmr.map((e, i) => (closeTmr[i] - closeToday[i]) / closeToday[i])
    return rtn
  }

  const calculateIndividualBeta = (bmk, ticker) => {

    let processBmk = handleDuplicateDate(bmk)
    let processticker = handleDuplicateDate(ticker)

    let uniqueDates = [...new Set(processBmk.map(e=>e.date).concat(ticker.map(e=>e.date)))]
    let _ticker = processticker.filter(e=>uniqueDates.includes(e.date)).map(e=>e.close)
    let _bmk = processBmk.filter(e=>uniqueDates.includes(e.date)).map(e=>e.close)

    let _tickerRtn = calculateRtn(_ticker)
    let _bmkRtn = calculateRtn(_bmk)

    let cov = covariance(_tickerRtn, _bmkRtn)
    let bmkvar = variance(_bmkRtn)
    return cov / bmkvar

  }

  const handleDuplicateDate = (tickers)=>{
    let record = []
    let unq = []
    for (let ticker of tickers) {
      if (unq.includes(ticker.date) === false) {
        record.push(ticker)
        unq.push(ticker.date)
      }
    }
    return record}

  const calculateBeta = async () => {
    setBetaList("")
    let totalBeta=0
    let benchmarkRtnList = await getTickerData('^GSPC')
    let res = []
    for (let ticker of inputList){
      let tickerRtnList = await getTickerData(ticker.stockTicker)
      let beta = calculateIndividualBeta(tickerRtnList, benchmarkRtnList)
      res.push({ticker:ticker.stockTicker,
                beta: beta,
                weight:ticker.weight})
      totalBeta += beta * ticker.weight
    }

    setBetaList(res)
    setBeta(totalBeta)
  }

  return (
    <div className="Calculator">
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="stockTicker"
              value={x.stockTicker}
              placeholder="Enter Stock Ticker"
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="weight"
              value={x.weight}
              placeholder="Enter Weight (0 - 1)"
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button
                onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <div>Portfolio Beta: {beta}</div>
      <button onClick={calculateBeta}>Calculate</button>
    </div>
  );
}




export default Calculator;