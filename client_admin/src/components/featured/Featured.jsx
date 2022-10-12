import "./featured.scss"
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { type } from "./typeFeature.js";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
function Featured() {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title"> Total Revenue</h1>
                <MoreVertIcon className="icon" fontSize="small" />

            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className="title">total sales made to day</p>
                <p className="amount">$420</p>
                <p className="desc">Previous transactions processing. Last payments may not be include</p>
                <div className="summary">
                    {renderSummaryItem()}

                </div>
            </div>
        </div>
    )
}
function renderSummaryItem() {
    return type.map((item) => {
        return <div className="item">
            <div className="itemTitle">
                {item.title}
            </div>
            <div className="itemResult">
                {/* <TrendingUpIcon fontSize="small" />, */}
                <TrendingDownIcon fontSize="small" />
                <div className="resultAmount">
                    12.4k
                </div>
            </div>
        </div>
    })
}

export default Featured