import React, { useState, useEffect } from 'react';
import Chart from '../../components/Chart/Chart';
import Menu from '../../components/Menu/Menu';
import FavoriteBook from '../../components/User/Favorite/FavoriteBook';
import Favorites from '../../components/User/Favorite/Favorites';
import HistoryItem from '../../components/User/History/HistoryItem';
import NotificationItem from '../../components/User/Notification/NotificationItem';
import { FakeData } from '../../variables/FakeData';
import './UserAccount.scss';
import { useStore, actions } from '../../store';
import * as AuthServices from '../../apiServices/AuthServices'
import ChoseAvatarDialog from './ChoseAvatarDialog';
import ComfirmChangeInfo from './ComfirmChangeInfo';
import { wait } from '@testing-library/user-event/dist/utils';
import Address from '../../components/User/Address/Address';

const UserAccount = () => {
    const [state, dispatch] = useStore()

    const { userCurrentTbIndex } = state

    const [currentToolbarItem, setcurrentToolbarItem] = useState(userCurrentTbIndex)
    useEffect(() => {
        setcurrentToolbarItem(state.userCurrentTbIndex)
    }, [state.userCurrentTbIndex])
    const options = {
        ChangePassWord: 'change-page-word',
        Notification: {
            SelectAll: 'select-all-notificaiton',
            NonRead: 'select-non-read-notification'
        },
        Product: {
            OnGoing: 'products-on-going',
            HaveReceived: 'product-have-received'
        }
    }
    const [isOpenAvatarChose, setIsOpenAvatarChose] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)
    var toolItems = [
        {
            name: 'Thông tin tài khoản',
            order: 1
        },
        {
            name:'Địa chỉ giao hàng',
            order:6
        },
        {
            name: 'Thông báo',
            order: 2
        },
        {
            name: 'Yêu thích',
            order: 5
        },
        {
            name: 'Đơn hàng',
            order: 3
        },
        {
            name: 'Bảo mật',
            order: 4
        },

    ]
    var notificationItem = [
        {
            name: 'Tất cả',
            order: 1,
            option: options.Notification.SelectAll
        },
        {
            name: 'Chưa xem',
            order: 2,
            option: options.Notification.NonRead
        },
    ]
    const [selectedNotification, setselectedNotification] = useState(options.Notification.SelectAll)

    var productStatus = [
        {
            name: 'Đang giao',
            order: 1,
            option: options.Product.OnGoing
        },
        {
            name: 'Lịch sử mua hàng',
            order: 1,
            option: options.Product.HaveReceived
        }
    ]
    const [productsStatus, setProductStatus] = useState(options.Product.OnGoing)
    function getStyleToolbarItem(item) {
        return {
            color: item.order === currentToolbarItem ? 'var(--Pink)' : 'var(--Darkest)',
            boxShadow: item.order === currentToolbarItem ? '0 1px 3px rgba(0, 0, 0, 0.3)' : 'none',
            //borderBottom: item.order===currentToolbarItem? '2px solid var(--Pink)':'none'
            paddingRight: item.name === 'Thông báo' ? '32px' : '12px',
        }
    }
    function getOptionPageStyle(optionPageNumber) {
        return {
            display: currentToolbarItem === optionPageNumber ? 'block' : 'none'
        }
    }
    function getOptionStyle(option) {
        if (option === selectedOption)
            return {
                backgroundColor: 'var(--Pink)',
                color: 'var(--White)'
            }
    }
    function onWanaChangePassword() {
        setSelectedOption(selectedOption === options.ChangePassWord ? null : options.ChangePassWord)
    }
    function getStyleNotificationToolbarItem(option) {
        return {
            color: option === selectedNotification ? 'var(--Pink)' : 'var(--Darkest)',
            boxShadow: option === selectedNotification ? '0 1px 3px rgba(0, 0, 0, 0.3)' : 'none'
        }
    }
    function getNotifications(option) {
        var notifications = FakeData.notifications;
        var result = []
        var isReaded = option === options.Notification.NonRead ? false : true
        if (isReaded === false) {
            notifications.forEach(notif => {
                if (notif.isReaded === false) {
                    result.push(notif)
                }
            })
        } else {
            result = notifications
        }
        return result
    }
    function getStyleProductStatusToolbarItem(option) {
        return {
            color: option === productsStatus ? 'var(--Pink)' : 'var(--Darkest)',
            boxShadow: option === productsStatus ? '0 1px 3px rgba(0, 0, 0, 0.3)' : 'none'
        }
    }
    const renderNotificationPopup = (notificationNumber) => <div className='notification-number-container'>
        <span>{notificationNumber}</span>
    </div>


    //data
    const { userProfile } = state


    const onChangePassword = async () => {
        let currentPassword = document.getElementById('user-change-password-current').value
        let newPassword = document.getElementById('user-change-password-new').value
        let reNewPassword = document.getElementById('user-change-password-re-new').value

        if (newPassword !== reNewPassword)
            return false
        else {
            let verify = await AuthServices.verityAccount(currentPassword)
            if (!verify)
                return false
        }
        let userChangePassword = await AuthServices.changePassword(currentPassword, newPassword)
        return true
    }

    const resetPasswordInfo = () => {
        document.getElementById('user-change-password-current').value = ''
        document.getElementById('user-change-password-new').value = ''
        document.getElementById('user-change-password-re-new').value = ''
    }

    function updateUserProfile() {
        if (getUserUpdateProfile() === false) {
            return
        }
        setIsOpenComfirmPassword(true)
        //updateUserInfo(getUserUpdateProfile())
    }
    const updateUserInfo = async (userInfo) => {
        let updateUser = await AuthServices.changeProfile(userInfo)
    }
    function getUserUpdateProfile() {
        let upFirstName = document.getElementById('user-profile-firstname').value
        let upLastName = document.getElementById('user-profile-lastname').value
        let upEmail = document.getElementById('user-profile-email').value
        let upPhone = document.getElementById('user-profile-phone').value

        if (state.userProfile.firstName !== upFirstName ||
            state.userProfile.lastName !== upLastName ||
            state.userProfile.email !== upEmail ||
            state.userProfile.phone !== upPhone)
            return {
                firstName: upFirstName,
                lastName: upLastName,
                email: upEmail,
                phone: upPhone,
                sex: true,
                birthday: "2001-01-01T00:00:00.000Z"
            }
        else {
            return false
        }
    }


    function onOpenChoseAvatarDialog() {
        setIsOpenAvatarChose(!isOpenAvatarChose)
    }
    function closeChoseAvatarDialog() {
        setIsOpenAvatarChose(false)
    }

    const [isOpenComfirmPassword, setIsOpenComfirmPassword] = useState(false)
    function onOpenComfirmPassword() {
        setIsOpenComfirmPassword(!isOpenComfirmPassword)
    }
    function onCloseComfirmPassword() {
        setIsOpenComfirmPassword(false)
    }
    const onComfirmPassword = async (comfirm) => {
        if (comfirm) {
            await updateUserInfo(getUserUpdateProfile())
        }
    }


    return (
        <div>
            <Menu />
            <div className='user-account-page'>
                <div className='user-account-header'>

                </div>
                <div className='user-account-body'>
                    <div className='row .no-margin-padding'>
                        <div className='col-sm-4 uc-body-left-container .no-margin-padding'>
                            <div className='ucbl-avatar-container'>
                                <img className='avatar-img' src={state.isLogin?userProfile.avatar:require('../../assets/icons/defaultAvatar.png')} alt='avatar' />
                            </div>
                            <p className='ucbl-name no-margin-padding'>{userProfile.firstName} {userProfile.lastName}</p>
                            <p className='ucbl-email no-margin-padding'>{userProfile.email}</p>
                            <div className='ucbl-chart-container'>
                                <div className='chart-total'>
                                    <span>Đã chốt <span className='chart-value'>2000</span> đơn hàng</span>
                                </div>
                                <Chart />
                                <div className='chart-prices'>
                                    <div className='chart-price'>
                                        Tổng thiệt hại <span className='chart-value'>20<span className='chart-value-unit'>tr</span></span>
                                    </div>
                                    <div className='chart-price'>
                                        Tiết kiệm <span className='chart-value'>10<span className='chart-value-unit'>tr</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-8 uc-body-right-container .no-margin-padding'>
                            <div className='page-title'>
                                Cài đặt tài khoản
                            </div>
                            <div className='ucbr-tool-bar'>
                                {
                                    toolItems.map((item) => (
                                        <button className='tool-bar-item' style={getStyleToolbarItem(item)} onClick={() => setcurrentToolbarItem(item.order)}>
                                            {item.name}
                                            {item.name === 'Thông báo' ? renderNotificationPopup(3) : ''}
                                        </button>
                                    ))
                                }
                            </div>
                            <div className='option-page-containers'>
                                <div className='option-page-1' style={getOptionPageStyle(1)}>
                                    <div className='option-avatar-container'>
                                        <img className='avatar-img' src={state.isLogin?userProfile.avatar:require('../../assets/icons/defaultAvatar.png')} alt='avatar' />
                                        <button onClick={onOpenChoseAvatarDialog}><img src={require('../../assets/icons/ic-pen.png')} alt='pen' /></button>
                                        <ChoseAvatarDialog isOpen={isOpenAvatarChose} handleAvatarDialog={onOpenChoseAvatarDialog} onCloseModal={closeChoseAvatarDialog} />
                                    </div>
                                    <div className='option-page-user-title'>Thông tin tài khoản</div>
                                    <form className='info-form'>
                                        <div className='user-form-row-container no-margin-padding'>
                                            <div className='form-item'>
                                                <label>Họ tên đệm</label>
                                                <input type={'text'} id='user-profile-firstname' defaultValue={userProfile.firstName}></input>
                                            </div>
                                            <div className='form-item'>
                                                <label>Tên</label>
                                                <input type={'text'} id='user-profile-lastname' defaultValue={userProfile.lastName}></input>
                                            </div>
                                        </div>
                                        <div className='user-form-row-container no-margin-padding'>
                                            <div className='form-item'>
                                                <label>Email</label>
                                                <input type={'email'} id='user-profile-email' defaultValue={userProfile.email}></input>
                                            </div>
                                            <div className='form-item'>
                                                <label>Số điện thoại</label>
                                                <input type={'text'} id='user-profile-phone' defaultValue={userProfile.phone}></input>
                                            </div>
                                            {/* <div className='form-item'>
                                                    <label>Địa chỉ giao hàng</label>
                                                    <input type={'text'} value={'Liyue'}></input>
                                                </div> */}
                                        </div>
                                    </form>
                                    <button className='user-form-button' onClick={updateUserProfile}>Lưu</button>
                                    <ComfirmChangeInfo
                                        isOpen={isOpenComfirmPassword}
                                        handleComfirmPasswordDialog={onOpenComfirmPassword}
                                        onCloseModal={onCloseComfirmPassword}
                                        onComfirmPassword={onComfirmPassword}
                                    />
                                </div>
                                <div className='option-page-2' style={getOptionPageStyle(2)}>
                                    <div className='option-page-title'>Thông báo</div>
                                    <div className='otpion-notification-tool-bar'>
                                        {
                                            notificationItem.map((item) => (
                                                <button className='notification-tool-bar-item' style={getStyleNotificationToolbarItem(item.option)} onClick={() => setselectedNotification(item.option)}>
                                                    {item.name}
                                                </button>
                                            ))
                                        }
                                    </div>
                                    <div className='notification-container'>
                                        {
                                            getNotifications(selectedNotification).map((notif) => (
                                                <NotificationItem NotificationData={notif} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='option-page-3' style={getOptionPageStyle(3)}>
                                    <div className='option-page-title'>Đơn hàng</div>
                                    <div className='otpion-notification-tool-bar'>
                                        {
                                            productStatus.map((item) => (
                                                <button className='notification-tool-bar-item' style={getStyleProductStatusToolbarItem(item.option)} onClick={() => setProductStatus(item.option)}>
                                                    {item.name}
                                                </button>
                                            ))
                                        }
                                    </div>
                                    <div className='product-status-container'>
                                        {
                                            FakeData.books.map((book) => (
                                                <HistoryItem HistoryItemData={book} />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='option-page-4' style={getOptionPageStyle(4)}>
                                    <div className='option-page-title'>Đăng nhập</div>
                                    <div className='option-bounder' style={getOptionStyle(options.ChangePassWord)} onClick={() => onWanaChangePassword()}>
                                        <div className='img-bounder'>
                                            <img src={require('../../assets/icons/ic-popup-key.png')} alt='key'></img>
                                        </div>
                                        <div className='user-option-context'>
                                            <span className='option-tittle'>Đổi mật khẩu</span>
                                            <span className='option-description'>Sử dụng mật khẩu bạn chưa bao giờ dùng trước đây</span>
                                        </div>
                                    </div>
                                    <form className={`info-form option-info-form ${selectedOption === options.ChangePassWord ? 'action-option' : 'inaction-option'}`}>
                                        <div className='row no-margin-padding'>
                                            <div className='col-sm-6 no-margin-padding'>
                                                <div className='form-item'>
                                                    <label>Mật khẩu hiện tại</label>
                                                    <input type={'password'} id='user-change-password-current'></input>
                                                </div>
                                                <div className='form-item'>
                                                    <label>Mật khẩu mới</label>
                                                    <input type={'password'} id='user-change-password-new'></input>
                                                </div>
                                                <div className='form-item'>
                                                    <label>Xác nhật mật khẩu mới</label>
                                                    <input type={'password'} id='user-change-password-re-new'></input>
                                                </div>
                                            </div>
                                            <div className='col-sm-6 no-margin-padding'>
                                            </div>
                                        </div>
                                    </form>
                                    <button className={`user-form-button ${selectedOption === options.ChangePassWord ? 'action-option' : 'inaction-option'}`}
                                        onClick={async () => {
                                            let rs = onChangePassword()
                                            if (rs)
                                                resetPasswordInfo()
                                        }}>Lưu</button>
                                </div>
                                <div className='option-page-5' style={getOptionPageStyle(5)}>
                                    <div className='option-page-title'>Yêu thích</div>
                                    {
                                        <Favorites />
                                    }
                                </div>
                                <div className='option-page-6' style={getOptionPageStyle(6)}>
                                    <div className='option-page-title'>Danh sách địa chỉ</div>
                                    <Address />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='user-account-footer'>

                </div>
            </div>
        </div>
    );
}

export default UserAccount;
