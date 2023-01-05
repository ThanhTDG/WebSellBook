import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'
import './AddAddressButton.scss'
import * as AddressServices from '../../../../apiServices/AddressServices'
import { useStore, actions } from '../../../../store';

const AddAddressButton = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useStore()
    const [addressState, setAddressState] = useState({
        fullName: state.isLogin ? state.userProfile.fullName : '',
        phone: state.isLogin ? state.userProfile.phone : '',
        region: '',
        district: '',
        ward: '',
        address: ''
    })
    function toggleModal() {
        setIsOpen(!isOpen);
        props.hidePagniation()
    }
    const addAddress = async (address) => {
        setIsLoading(true)
        const response = await AddressServices.add(address)
        console.log('add address', response)
        setIsLoading(false)
    }
    const handleAddAddress = async () => {
        console.log('add address data', addressState)
        await addAddress(addressState)
        toggleModal()
        props.refrestData()
        setAddressState({
            ...addAddress,
            region: '',
            district: '',
            ward: '',
            address: ''
        })
    }
    const loadingModalStyle = {
        display: isLoading ? 'flex' : 'none'
    }
    return (
        <div className='add-address'>
            <div className='add-address-button-container'>
                <button className='add-address-button' onClick={toggleModal}>Thêm địa chỉ mới</button>
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
                        <img src={require('../../../../assets/icons/loading-none-background.gif')} alt='loadding'></img>
                    </div>
                    <div className='add-address-modal-container'>
                        <div>
                            <div className='add-address-title'>Thêm địa chỉ mới</div>
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
                                            <input type={'text'}
                                                defaultValue={addressState.region}
                                                onChange={(e) => setAddressState({
                                                    ...addressState, region: e.target.value
                                                })}></input>
                                        </div>
                                        <div className='form-item'>
                                            <label>Thành phố/ Quận/ Huyện</label>
                                            <input type={'text'}
                                                defaultValue={addressState.district}
                                                onChange={(e) => setAddressState({
                                                    ...addressState, district: e.target.value
                                                })}></input>
                                        </div>
                                    </div>
                                    <div className='add-address-form-row-container no-margin-padding'>
                                        <div className='form-item'>
                                            <label>Xã/ Phường/ Thị trấn</label>
                                            <input type={'email'}
                                                defaultValue={addressState.ward}
                                                onChange={(e) => setAddressState({
                                                    ...addressState, ward: e.target.value
                                                })}></input>
                                        </div>
                                        <div className='form-item'>
                                            <label>Địa chỉ nhà</label>
                                            <input type={'text'}
                                                defaultValue={addressState.address}
                                                onChange={(e) => setAddressState({
                                                    ...addressState, address: e.target.value
                                                })}></input>
                                        </div>
                                    </div>
                                </form>
                                <div className='add-address-form-button-container'>
                                    <button className='add-address-form-button' onClick={handleAddAddress}>Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='add-address-button-close' onClick={toggleModal}>
                        <img src={require('../../../../assets/icons/ic-close.png')} alt='close' />
                    </button>
                </Modal>
            </div>
        </div>
    );
}

export default AddAddressButton;
