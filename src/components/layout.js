/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle='Portfolio Beta Calculator' />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          <p style={{ marginTop: 20 }}>1, Calculated based on daily close price from Yahoo Finance API </p>
          <p>2, Beta is calculated with 3 years of daily close price</p>
          <p>3, Benchmark is SP500</p>
          <p>4, Calculation method is Covariance of Ticker / Variance of Benchmark return</p>
          <p>5, Feedbacks please send to wu.jingwei@yahoo.com</p>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
