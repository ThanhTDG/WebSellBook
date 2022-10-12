import React, { Component, useRef, useEffect } from "react";
import Chart from '../../components/Chart/Chart'
import Featured from '../../components/featured/Featured'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Table from '../../components/table/Table'
import Widget from '../../components/widget/Widget'
import "./home.scss"
function Home() {
  return (
    <div className='home'>
      <div className="appGlass">
        <Sidebar />
        <div className="homeContainer" style={{ overflowX: 'auto' }}>
          <Navbar />
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
              Lastest  transactions
            </div>
            <Table />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home