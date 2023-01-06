import React, { useState, useEffect } from 'react';
import { useStore } from '../../../store';
import Modal from 'react-modal'
import '../../User/Address/AddAddressButton/AddAddressButton.scss'
import './CheckoutButton.scss'
import * as AddressServices from '../../../apiServices/AddressServices'
import AddressItem from '../../User/Address/AddressItem/AddressItem';
import * as CheckoutServices from '../../../apiServices/CheckoutServices'
import { removeVietnameseTones } from '../../../CustomeTools/Tools';

const CheckoutButton = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useStore()

    const [selectAddress, setSelectedAddress] = useState({})
    const [currentAddressIndex, setCurrentAddressIndex] = useState(0)

    const [addressData, setAddressDate] = useState([])
    const [isAddNewAddress, setIsAddNewAddress] = useState(false)
    const [isRefrest, setIsRefrest] = useState(false)

    const [haveGuide, setHaveGuide] = useState(false)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1)
    const [guideData, setGuideData] = useState({
        orderCode: 20230104199524,
        total: 117600,
        fullName: 'User Name'
    })

    const [shippingMethod, setShippingMethod] = useState([
        'Giao hàng tiêu chuẩn',
        'Giao hàng tiết kiệm',
        'Giao hàng hỏa tốc'
    ])
    const [paymentMethod, setPaymentMethod] = useState([
        'Thanh toán khi nhận hàng',
        'Thanh toán trước'
    ])

    const [transportFee, setTransportFee] = useState(20000)

    const getAllAddress = async (page, limit) => {
        try {
            const response = await AddressServices.getAll(page, limit)
            setAddressDate(response)
            console.log('all address', response)
        } catch (ex) { }
    }
    useEffect(() => {
        getAllAddress(1, 12)
    }, [])

    const handleVisibilityPagniated = () => {
        setIsAddNewAddress(!isAddNewAddress)
    }

    const refrestData = () => {
        setIsRefrest(!isRefrest)
    }

    useEffect(() => {
        getAllAddress(1, 12)
    }, [isRefrest])

    function toggleModal() {
        setIsOpen(!isOpen);
        props.hidePagniation()
    }
    const loadingModalStyle = {
        display: isLoading ? 'flex' : 'none'
    }
    const onLeftAddressChange = () => {
        currentAddressIndex === 0 ?
            setCurrentAddressIndex(addressData.length - 1) :
            setCurrentAddressIndex(currentAddressIndex - 1)

    }

    const onRightAddressChange = () => {
        currentAddressIndex === addressData.length - 1 ?
            setCurrentAddressIndex(0) :
            setCurrentAddressIndex(currentAddressIndex + 1)

    }

    const animation = () => {
        let content = document.getElementById('slider-addres-container')
        content.classList.add("animate");

        setTimeout(function () {
            content.classList.remove("animate");
        }, 500);
    }

    useEffect(() => {
        console.log('index', currentAddressIndex)
        try {
            animation()
        } catch (ex) { }
    }, [currentAddressIndex])

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleCheckout = async () => {
        var smSelect = document.getElementById('shipping-method')
        var pmSelect = document.getElementById('payment-method')
        var checkoutInfo = {
            ...addressData[currentAddressIndex],
            shippingMethod: smSelect.value,
            paymentMethod: pmSelect.value,
            transportFee: transportFee,
            discount: props.discount
        }
        delete checkoutInfo._id
        console.log(checkoutInfo)
        setIsLoading(true)
        var checkoutRes = await CheckoutServices.checkout(checkoutInfo)
        setIsLoading(false)
        console.log(checkoutRes)
        if (checkoutRes.paymentMethod === paymentMethod[1]) {
            setHaveGuide(true)
            setGuideData({
                orderCode: checkoutRes.orderCode,
                fullName: checkoutRes.shippingInfo.fullName,
                total: checkoutRes.total
            })
        } else {
            setIsOpen(!isOpen)
            props.refrestData()
        }
    }
    const checkoutModalContainerStyle = {
        display: haveGuide ? 'none' : 'flex'
    }
    const guideModalContainerStyle = {
        display: haveGuide ? 'flex' : 'none'
    }
    const getActivePaymentStyle = (paymentOrder) => {
        var isActive = selectedPaymentMethod === paymentOrder
        return {
            backgroundColor: isActive ? 'var(--Blue)' : 'white',
            color: isActive ? 'white' : 'var(--Darkest)'
        }
    }
    const handleAccept = () => {
        setIsOpen(!isOpen)
        setHaveGuide(false)
        props.refrestData()
    }
    const bankNameItemStyle = {
        display: selectedPaymentMethod === 3 ? 'flex' : 'none'
    }
    const renderAddress = () => {
        var toRenders = []
        console.log(addressData)
        if (addressData !== undefined) {
            if (addressData.length > 0) {
                toRenders.push(
                    <div>
                        <div className='add-address-items'>
                            <button onClick={onLeftAddressChange}><img src={require('../../../assets/icons/ic-previou.png')} alt='ic-previous' /></button>
                            <div id='slider-addres-container'>
                                {
                                    addressData.length > 0 ?
                                        <AddressItem haveMinWidth={true} canRemove={false} addressData={addressData[currentAddressIndex]} hidePagniation={handleVisibilityPagniated} refrestData={refrestData} />
                                        : ''
                                }
                            </div>
                            <button onClick={onRightAddressChange}><img src={require('../../../assets/icons/ic-next.png')} alt='ic-next' /></button>
                        </div>
                    </div>
                )
            }
        } else {
            toRenders.push('')
        }
        return toRenders
    }
    return (
        <div className='add-address'>
            <div className='add-address-button-container'>
                <button disabled={!props.isActive} className='btn-checkout' onClick={toggleModal}>Thanh toán</button>
            </div>
            <div className='add-address-container'>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    ariaHideApp={false}
                >
                    <div className='add-address-modal-loading' style={loadingModalStyle}>
                        <img src={require('../../../assets/icons/loading-none-background.gif')} alt='loadding'></img>
                    </div>
                    <div style={guideModalContainerStyle} className='add-address-modal-container'>
                        <div>
                            <div className='add-address-title'>Chọn hình thức thanh toán trước</div>
                            <div>
                                <div className='payment-method-container'>
                                    <button className='payment-method-item' style={getActivePaymentStyle(1)} onClick={() => setSelectedPaymentMethod(1)}>
                                        <img src={require('../../../assets/checkout-infos/momo.png')} alt='momo' />
                                        <span>Ví điện tử MoMo</span>
                                    </button>
                                    <button className='payment-method-item' style={getActivePaymentStyle(2)} onClick={() => setSelectedPaymentMethod(2)}>
                                        <img src={require('../../../assets/checkout-infos/zalo.png')} alt='momo' />
                                        <span>Zalo Pay</span>
                                    </button>
                                    <button className='payment-method-item' style={getActivePaymentStyle(3)} onClick={() => setSelectedPaymentMethod(3)}>
                                        <img src={require('../../../assets/checkout-infos/agribank.png')} alt='momo' />
                                        <span>Agribank</span>
                                    </button>
                                </div>
                            </div>
                            <div className='payment-guides'>
                                <div className='payment-guide-item'>
                                    <div className='payment-guide-title'>Mã đơn hàng</div>
                                    <div className='payment-guide-value sub-hight-light'>{guideData.orderCode}</div>
                                </div>
                                <div className='payment-guide-item'>
                                    <div className='payment-guide-title'>Số tài khoản</div>
                                    <div className='payment-guide-value hight-light'>9999 999 999</div>
                                </div>
                                <div className='payment-guide-item'>
                                    <div className='payment-guide-title'>Tên tài khoản</div>
                                    <div className='payment-guide-value'>TOI MUA SACH</div>
                                </div>
                                <div className='payment-guide-item' style={bankNameItemStyle}>
                                    <div className='payment-guide-title'>Tên ngân hàng</div>
                                    <div className='payment-guide-value'>Agribank</div>
                                </div>
                                <div className='payment-guide-item'>
                                    <div className='payment-guide-title'>Tổng thanh toán</div>
                                    <div className='payment-guide-value hight-light'>{formatter.format(parseInt(guideData.total))}</div>
                                </div>
                                <div className='payment-guide-item'>
                                    <div className='payment-guide-title'>Nội dung chuyển khoản</div>
                                    <div className='payment-guide-value hight-light'>{removeVietnameseTones(guideData.fullName)} {guideData.orderCode}</div>
                                </div>
                                <div className='btn-accept-container'>
                                    <button className='checkout-final-btn' onClick={handleAccept}>Hoàn tất</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={checkoutModalContainerStyle} className='add-address-modal-container'>
                        <div>
                            <div className='add-address-title'>Thông tin thanh toán</div>
                            <div className='add-address-contents'>
                                {
                                    // addressData.length > 0 ?
                                    //     <div>
                                    //         <div className='add-address-items'>
                                    //             <button onClick={onLeftAddressChange}><img src={require('../../../assets/icons/ic-previou.png')} alt='ic-previous' /></button>
                                    //             <div id='slider-addres-container'>
                                    //                 {
                                    //                     addressData.length > 0 ?
                                    //                         <AddressItem haveMinWidth={true} canRemove={false} addressData={addressData[currentAddressIndex]} hidePagniation={handleVisibilityPagniated} refrestData={refrestData} />
                                    //                         : ''
                                    //                 }
                                    //             </div>
                                    //             <button onClick={onRightAddressChange}><img src={require('../../../assets/icons/ic-next.png')} alt='ic-next' /></button>
                                    //         </div>
                                    //     </div>
                                    //     : ''
                                    renderAddress()
                                }
                            </div>
                            <div className='checkout-method-container'>
                                <div class="shipping-method">Phương thức giao hàng</div>
                                <select name="shippingMethod" id="shipping-method">
                                    {
                                        shippingMethod.map((method) => (
                                            <option value={method}>{method}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='checkout-method-container'>
                                <div class="payment-method">Phương thức thanh toán</div>
                                <select name="paymentMethod" id="payment-method">
                                    {
                                        paymentMethod.map((method) => (
                                            <option value={method}>{method}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='check-method-prices'>
                                <div className='checkout-method-container '>
                                    <div className='checkout-prices-container'>
                                        <div class="checkout-prices">{formatter.format(parseInt(props.productPrices + transportFee))}</div>
                                        <div className='sub-prices-container'>
                                            <div className='sub-prices-item'>
                                                <div className='sub-prices-title'>Sản phẩm</div>
                                                <div className='sub-prices-value'>{formatter.format(parseInt(props.productPrices))}</div>
                                            </div>
                                            <div className='sub-prices-item'>
                                                <div className='sub-prices-title'>Giao hàng</div>
                                                <div className='sub-prices-value'>{formatter.format(transportFee)}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='checkout-final-btn' onClick={handleCheckout}>Thanh toán</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='add-address-button-close' onClick={toggleModal}>
                        <img src={require('../../../assets/icons/ic-close.png')} alt='close' />
                    </button>
                </Modal>
            </div>
        </div>
    );
}

export default CheckoutButton;
