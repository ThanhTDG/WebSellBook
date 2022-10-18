import React, { Component, useRef, useEffect } from "react";
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
import Layout from "../../components/layout/Layout";
import Widget from '../../components/widget/Widget'
import "./home.scss"
function Home() {
  return (
    <Layout>
      <div className='widgets'>
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className='charts'>
        <Featured />
        <Chart />
      </div>
      <div className="listContainer">
        <div className="listTitle">

        </div>

      </div>
    </ Layout>
  )
}

export default Home