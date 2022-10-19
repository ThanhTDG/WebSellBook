import React from 'react';
import { MyVariable } from '../../variables/variables';
import './SendComment.scss';

const SendComment = () => {
    const btnAttrachImage={
        background: `url('${MyVariable.hostName}/assets/icons/ic-attrach-image-32.png') center center`,
        width: '36px',
        height: '36px',
        border:'none',
        'margin-top':'4px'
    }
    const btnSendStyle={
        width:'36px',
        height: '36px',
        border:'24px',
        background:`url('${MyVariable.hostName}/assets/icons/ic-btn-send-32.png') center center`
    }
    function onComment(e){
        var btn = document.getElementById('btn-send-container')
        var btnSend = document.getElementById('btn-send')
        if(e.target.value !==''){
            btn.style.backgroundColor='var(--Pink)'
            btnSend.disabled = false
        }else{
            btn.style.backgroundColor='var(--Gray)'
            btnSend.disabled = true
        }
    }
    return (
        <div className='row'>
            <div className='col-sm-11'>
                <div className='row send-comment-container'>
                    <div className='col-11'>
                        <input type='text' placeholder='Nhập xét của bạn...' onChange={(e)=>(onComment(e))}/>
                    </div>
                    <div className='col-1'>
                        <button style={btnAttrachImage}></button>
                    </div>
                </div>
            </div>
            <div className='col-sm-1'>
                <div id='btn-send-container'>
                    <button id='btn-send' style={btnSendStyle}>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SendComment;
