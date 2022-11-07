import React, { Component, useRef, useEffect } from "react";
import Chart from '~/components/Charts/Chart';
import Featured from '~/components/Featured';
import { Widget } from '~/components/Widget';
import { Button } from '~/components/Button';
import "./home.scss"
function Home() {
    return (
        <div className="home">

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
        </ div>
    )
}

export default Home