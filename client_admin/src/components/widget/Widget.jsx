import './widget.scss'
import { icons } from "../../assets/images/ImageUtility.js"
import { type as typeWidget } from "./typeWidget.js"

function Widget({ type }) {
    const amount = 100;
    const diff = 20;
    let data = typeWidget[type];
    return (
        <div className="widget">
            <div className="left">
                <span className='title'>{data.title}</span>
                <span className='counter'>{data.isMoney && "$"}{amount}</span>
                <span className='link'>{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    {icons["increase"]}
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget