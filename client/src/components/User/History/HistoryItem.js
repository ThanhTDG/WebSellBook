import React from 'react';
import './HistoryItem.scss'

const HistoryItem = (props) => {
    const productData = props.productData
    const bookImageStyle = {
        background: `url('${productData.book.images[0]}')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '112px',
        height: '160px',
        backgroundSize: '148%',
        borderRadius: '12px'
    }
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className='history-item-container'>

            <div className='history-content-container'>
                <div className='history-content-bounder'>
                    <div className='history-book-image' style={bookImageStyle}></div>
                    <div className='history-content'>
                        <div>
                            <span className='book-title'>{productData.book.name}</span>
                            {/* <span className='book-author'>Makoto Shinkai</span> */}
                            <span className='amount'>Số lượng: {productData.quantity}</span>
                        </div>
                        <div className='history-prices-container'>
                            <div>
                                <div className='prv-prices-container'>
                                    <span className='prv-price'>{formatter.format(parseInt(productData.book.originalPrice))}</span>
                                    <span className='discount-rate'>-{productData.book.discountRate}%</span>
                                </div>
                                <span className='cur-price'>{formatter.format(parseInt(productData.book.price))}</span>
                            </div>
                            <div><span className='cur-price total-price'>{formatter.format(parseInt(productData.total))}</span></div>
                        </div>
                    </div>
                </div>
                <div className='history-options-container'>
                    <button>Mua lại</button>
                </div>
            </div>
        </div>
    );
}

export default HistoryItem;
