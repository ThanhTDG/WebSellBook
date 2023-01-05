import React from 'react';
import { FakeData } from '../../../variables/FakeData';
import HistoryItem from '../History/HistoryItem';
import './OrderProducts.scss'

const OrderProducts = (props) => {
    const orderData = props.orderData

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    
    return (
        <div className='order-container'>
            <div className='order-header'>
                <img src={require('../../../assets/icons/ic-logo-only.png')} alt='logo' />
                <span>Tôi mua sách</span>
            </div>
            {
                orderData.items.map((item) => (
                    <HistoryItem productData={item} />
                ))
            }
            <div className='order-info-container'>
                <div className='order-infos'>
                    <div className='order-info-item'>
                        <div className='order-info-item-title'>Đơn vị giao hàng</div>
                        <div className='order-info-item-value'>{orderData.shippingMethod}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-info-item-title'>Phương thức thanh toán</div>
                        <div className='order-info-item-value'>{orderData.paymentMethod}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-info-item-title'>Phí vận chuyển</div>
                        <div className='order-info-item-value'>{formatter.format(parseInt(orderData.transportFee))}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-info-item-title'>Giảm giá</div>
                        <div className='order-info-item-value'>- {formatter.format(parseInt(orderData.discount))}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-info-item-title'>Người nhận</div>
                        <div className='order-info-item-value'>{orderData.shippingInfo.fullName}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-info-item-title'>Số điện thoại</div>
                        <div className='order-info-item-value'>{orderData.shippingInfo.phone}</div>
                    </div>
                    <div className='order-info-item'>
                        <div className='order-info-item-title'>Giao tới</div>
                        <div className='order-info-item-value'>
                            {orderData.shippingInfo.address} - {orderData.shippingInfo.ward} - {orderData.shippingInfo.district} - {orderData.shippingInfo.region}
                        </div>
                    </div>
                    
                </div>
                <div className='order-prices'>
                    <div className='order-main-prices'>{formatter.format(parseInt(orderData.total))}</div>
                </div>
            </div>
        </div>
    );
}

export default OrderProducts;
