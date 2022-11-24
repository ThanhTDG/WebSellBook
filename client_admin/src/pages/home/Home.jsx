import React, { Component, useRef, useEffect } from "react";
import Chart from "~/components/Charts/Chart";
import Featured from "~/components/Featured";
import Widget from "~/components/Widget";
import { Button } from "~/components/controls/Button";
import "./home.scss";
import ColumChart from "~/components/Charts/ColumChart";
import OutlinedBox from "~/components/OutlinedBox";
function Home() {
	return (
		<div className="home">
			<div className="content">
				<div className="widgets">
					<Widget type="user" />
					<Widget type="order" />
					<Widget type="earning" />
					<Widget type="balance" />
				</div>
				<div className="charts">
					<OutlinedBox title="Sách bán chạy">
						<ColumChart />
					</OutlinedBox>
					<Chart />
				</div>
				<div className="listContainer">
					<div className="listTitle"></div>
				</div>
			</div>
		</div>
	);
}

export default Home;
