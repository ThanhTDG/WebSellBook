import React, { useState } from 'react';
import './NotificationItem.scss'

const NotificationItem = (props) => {
    const notif = props.NotificationData
    const [isShowMore, setIsShowMore] = useState(false)
    const btnShowMoreContentStyle={
        display: isShowMore===false? 'inline':'none'
    }
    const btnHideContentStyle ={
        display: isShowMore===true? 'inline':'none'
    }
    return (
        <div className='notification-item-container'>
            <div className='avatar-container'>
                <img src={require('../../../assets/icons/ic-logo-only.png')} alt='avatar' />
            </div>
            <div className='notification-content'>
                <span className='notifiction-sender'>
                    {notif.name}
                </span>
                <span className='notification-text'>
                    {notif.content.length > 220 && isShowMore === false ? notif.content.substring(0, 220) : notif.content}
                    <button onClick={()=>setIsShowMore(true)} style={btnShowMoreContentStyle}>...xem thêm</button>
                    <button onClick={()=>setIsShowMore(false)} style={btnHideContentStyle}>thu nhỏ</button>
                </span>
                <span className={`notifiction-time ${notif.isReaded === false ? 'pink-color' : 'gray-color'}`}>
                    {notif.time}
                </span>
            </div>
        </div>
    );
}

export default NotificationItem;
