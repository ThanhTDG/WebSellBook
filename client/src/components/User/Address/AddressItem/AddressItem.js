import React, { useState } from 'react';
import './AddressItem.scss'
import Modal from 'react-modal'
import '../AddAddressButton/AddAddressButton.scss'
import * as AddressServices from '../../../../apiServices/AddressServices'

const AddressItem = (props) => {
    const addressData = props.addressData
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [addressState, setAddressState] = useState({
        fullName: addressData.fullName,
        phone: addressData.phone,
        region: addressData.region,
        district: addressData.district,
        ward: addressData.ward,
        address: addressData.address,
    })
    const toggleModal = () => {
        setIsOpen(!isOpen)
        props.hidePagniation()
    }
    const handleRemoveAddress = async() => {
        const response = await AddressServices.removeAddress(props.addressData._id)
        console.log('remove address', response)
        props.refrestData()
    }
    const loadingModalStyle = {
        display: isLoading ? 'flex' : 'none'
    }
    const handleUpdateAddress = async ()=>{
        setIsLoading(true)
        const response = await AddressServices.updateAddress(props.addressData._id, addressState)
        console.log('update address', response)
        setIsLoading(false)
        props.refrestData()
        toggleModal()

    }
    return (
        <div className='address-item'>
            <div className='address-item-contents' onClick={toggleModal}>
                <div className='address-item-content'><span>Họ và tên</span> {addressData.fullName}</div>
                <div className='address-item-content'><span>Số điện thoại</span> {addressData.phone}</div>
                <div className='address-item-content'><span>Tỉnh thành</span> {addressData.region}</div>
                <div className='address-item-content'><span>Thành phố / Quận / Huyện</span> {addressData.district}</div>
                <div className='address-item-content'><span>Xã / Phường / Thị trấn</span> {addressData.ward}</div>
                <div className='address-item-content'><span>Địa chỉ nhà</span> {addressData.address}</div>
            </div>
            <div className='address-item-option'>
                <button className='remove-address-item-button' onClick={handleRemoveAddress}>
                    <img src={require('../../../../assets/icons/ic-trash-gray.png')} alt='remove' />
                </button>
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                ariaHideApp={false}
            >
                <div className='add-address-modal-loading' style={loadingModalStyle}>
                        <img src={require('../../../../assets/icons/loading-none-background.gif')} alt='loadding'></img>
                    </div>
                <div className='add-address-modal-container'>
                    <div>
                        <div className='add-address-title'>Chỉnh sửa địa chỉ</div>
                        <div className='add-address-contents'>
                            <form className='info-form'>
                                <div className='add-address-form-row-container no-margin-padding'>
                                    <div className='form-item'>
                                        <label>Họ và tên</label>
                                        <input type={'text'}
                                            defaultValue={addressState.fullName}
                                            onChange={(e) => setAddressState({
                                                ...addressState, region: e.target.value
                                            })}></input>
                                    </div>
                                    <div className='form-item'>
                                        <label>Số điện thoại</label>
                                        <input type={'text'}
                                            defaultValue={addressState.phone}
                                            onChange={(e) => setAddressState({
                                                ...addressState, district: e.target.value
                                            })}></input>
                                    </div>
                                </div>
                                <div className='add-address-form-row-container no-margin-padding'>
                                    <div className='form-item'>
                                        <label>Tỉnh thành</label>
                                        <input type={'text'} defaultValue={addressState.region}
                                            onChange={(e) => setAddressState({
                                                ...addressState, region: e.target.value
                                            })}>
                                        </input>
                                    </div>
                                    <div className='form-item'>
                                        <label>Thành phố/ Quận/ Huyện</label>
                                        <input type={'text'} defaultValue={addressState.district}
                                            onChange={(e) => setAddressState({
                                                ...addressState, district: e.target.value
                                            })}>
                                        </input>
                                    </div>
                                </div>
                                <div className='add-address-form-row-container no-margin-padding'>
                                    <div className='form-item'>
                                        <label>Xã/ Phường/ Thị trấn</label>
                                        <input type={'email'} defaultValue={addressState.ward}
                                            onChange={(e) => setAddressState({
                                                ...addressState, ward: e.target.value
                                            })}></input>
                                    </div>
                                    <div className='form-item'>
                                        <label>Địa chỉ nhà</label>
                                        <input type={'text'} defaultValue={addressState.address}
                                            onChange={(e) => setAddressState({
                                                ...addressState, address: e.target.value
                                            })}></input>
                                    </div>
                                </div>
                            </form>
                            <div className='add-address-form-button-container'>
                                <button className='add-address-form-button' onClick={handleUpdateAddress}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='add-address-button-close' onClick={toggleModal}>
                    <img src={require('../../../../assets/icons/ic-close.png')} alt='close' />
                </button>
            </Modal>
        </div>

    );
}

export default AddressItem;
