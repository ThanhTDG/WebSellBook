import React from 'react';
import { MyVariable } from '../../variables/variables';
import './SendComment.scss';

const SendComment = () => {
    const btnAttrachImage={
        width: '36px',
        height: '36px',
        border:'none',
        'margin-top':'4px'
    }
    const btnSendStyle={
        width:'36px',
        height: '36px',
        border:'18px',
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
            <div className='col-sm-11 '>
                <div className='row send-comment-container'>
                    <div className='col-sm-11 send-comment-bounder'>
                        <input type='text' placeholder='Nhập xét của bạn...' onChange={(e)=>(onComment(e))}/>
                    </div>
                    <div className='col-sm-1 send-comment-btn-image'>
                        <button style={btnAttrachImage}>
                            <img src={require('../../assets/icons/ic-image.png')} alt='attach' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='col-sm-1 btn-send-bounder'>
                <div id='btn-send-container'>
                    <button id='btn-send' style={btnSendStyle}>
                        <img src={require('../../assets/icons/ic-send.png')} alt='send'/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SendComment;
