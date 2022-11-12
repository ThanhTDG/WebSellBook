import React from 'react';
import './HistoryItem.scss'

const HistoryItem = (props) => {
    const historyItemData = props.historyItemData
    const bookImageStyle = {
        background: `url('https://salt.tikicdn.com/cache/w1200/ts/product/d5/56/e1/230844af8f876d7924829e25a1354358.jpg') center center`,
        backgroundRepeat: 'no-repeat',
        width: '112px',
        height: '160px',
        backgroundSize: '148%',
        borderRadius: '12px'
    }
    return (
        <div className='history-item-container'>
            <div className='history-header'>
                <img src={require('../../../assets/icons/ic-logo-only.png')} alt='logo' />
                <span>Tôi mua sách</span>
            </div>
            <div className='history-content-container'>
                <div className='history-content-bounder'>
                    <div className='history-book-image' style={bookImageStyle}></div>
                    <div className='history-content'>
                        <span className='book-title'>Bên kia mây trời là nơi hẹn ước</span>
                        <span className='book-author'>Makoto Shinkai</span>
                        <span className='amount'>x10</span>
                        <div className='history-prices-container'>
                            <span className='prv-price'>160000 đ</span>
                            <span className='cur-price'>140000 đ</span>
                        </div>
                    </div>
                    <div className='history-botton-option'>
                        <div className='history-bottom-option-bounder'>
                            <div className='history-checkout-container'>
                                <span className='history-checkout-text'>Thành tiền</span>
                                <span className='history-checkout-value'>140000 đ</span>
                            </div>
                            <div className='history-options-container'>
                                <button>Mua lại</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default HistoryItem;
