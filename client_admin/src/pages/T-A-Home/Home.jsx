import React, { Component, useRef, useEffect } from "react";
import Chart from "~/components/Charts/Chart";
import Featured from "~/components/T-A-Featured";
import Widget from "~/components/T-A-Widget";
import { Button } from "~/components/controls/Button";
import "./home.scss";
import ColumChart from "~/components/Charts/ColumChart";
import OutlinedBox from "~/components/OutlinedBox";
import { displayMoney } from "~/utils/display";
function Home() {
	return (
		<div className="home">
			<div className="content">
				<div className="widgets">
					<Widget
						type="user"
						value={72}
					/>
					<Widget
						type="order"
						value={16}
					/>
					<Widget
						type="earning"
						value={displayMoney(1975000)}
					/>
					<Widget
						type="balance"
						value={displayMoney(981000)}
					/>
				</div>
				<div className="charts">
					<OutlinedBox title="Sách bán chạy">
						<ColumChart />
					</OutlinedBox>
					<Chart />
				</div>
			</div>
		</div>
	);
}

export default Home;
