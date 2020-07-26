import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Calculator from "../components/calculator"

const IndexPage = () => (
  <Layout>
    <SEO title="Beta Calculator" description="Stock / Portfolio CAMP beta calculator"/>
    <Calculator/>
  </Layout>
)

export default IndexPage
