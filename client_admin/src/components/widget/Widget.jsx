import './widget.scss'
import { icons } from "~/assets/images"
import { type as typeWidget } from "./typeWidget.js"
import { Link } from 'react-router-dom';

function Widget({ type }) {
    const amount = 100;
    const diff = 20;
    let data = typeWidget[type];
    return (
        <div className="widget">
            <div className="left">
                <span className={`title ${data.key}`}>{data.title}</span>
                <span className='counter'>{data.isMoney && "$"}{amount}</span>
                <Link className='view'>{data.link}</Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    {icons.Chart["increase"]}
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div >
    )
}

export default Widget