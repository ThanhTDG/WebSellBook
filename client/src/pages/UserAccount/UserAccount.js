import React, { useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import Books from '../../components/Book/Books';
import Chart from '../../components/Chart/Chart';
import Menu from '../../components/Menu/Menu';
import FavoriteBook from '../../components/User/Favorite/FavoriteBook';
import HistoryItem from '../../components/User/History/HistoryItem';
import NotificationItem from '../../components/User/Notification/NotificationItem';
import { FakeData } from '../../variables/FakeData';
import { MyVariable } from '../../variables/variables';
import './UserAccount.scss';

const UserAccount = () => {
    const [currentToolbarItem, setcurrentToolbarItem] = useState(1)
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
    const [selectedOption, setSelectedOption] = useState(null)
    var toolItems = [
        {
            name: 'Thông tin tài khoản',
            order: 1
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
                                <img className='avatar-img' src={require('../../assets/fake-data/avatar.jpg')} alt='avatar' />
                            </div>
                            <p className='ucbl-name no-margin-padding'>Kadezaha Kazuha</p>
                            <p className='ucbl-email no-margin-padding'>kazuha@kadezaha.inazuma.teyvat</p>
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
                                        <img className='avatar-img' src={require('../../assets/fake-data/avatar.jpg')} alt='avatar' />
                                        <button><img src={require('../../assets/icons/ic-pen.png')} alt='pen' /></button>
                                    </div>
                                    <div className='option-page-user-title'>Thông tin tài khoản</div>
                                    <form className='info-form'>
                                        <div className='row no-margin-padding'>
                                            <div className='col-sm-6 no-margin-padding'>
                                                <div className='form-item'>
                                                    <label>Họ và tên</label>
                                                    <input type={'text'} value={'Kadezaha Kazuha'}></input>
                                                </div>
                                                <div className='form-item'>
                                                    <label>Email</label>
                                                    <input type={'text'} value={'kazuha@kadezaha.inazuma.teyvat'}></input>
                                                </div>
                                            </div>
                                            <div className='col-sm-6 no-margin-padding'>
                                                <div className='form-item'>
                                                    <label>Số điện thoại</label>
                                                    <input type={'text'} value={'0971777777'}></input>
                                                </div>
                                                <div className='form-item'>
                                                    <label>Địa chỉ giao hàng</label>
                                                    <input type={'text'} value={'Liyue'}></input>
                                                </div>
                                            </div>
                                        </div>
                                        <button>Lưu</button>
                                    </form>
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
                                                    <input type={'password'} value={'Kadezaha Kazuha'}></input>
                                                </div>
                                                <div className='form-item'>
                                                    <label>Mật khẩu mới</label>
                                                    <input type={'password'} value={'kazuha@kadezaha.inazuma.teyvat'}></input>
                                                </div>
                                                <div className='form-item'>
                                                    <label>Xác nhật mật khẩu mới</label>
                                                    <input type={'password'} value={'kazuha@kadezaha.inazuma.teyvat'}></input>
                                                </div>
                                            </div>
                                            <div className='col-sm-6 no-margin-padding'>
                                            </div>
                                        </div>
                                        <button>Lưu</button>
                                    </form>
                                </div>
                                <div className='option-page-5' style={getOptionPageStyle(5)}>
                                    <div className='option-page-title'>Yêu thích</div>
                                    <div className='option-page-favorites'>
                                        {
                                            FakeData.books.map((book) => (
                                                <FavoriteBook bookData={book} height='280' />
                                            ))
                                        }
                                    </div>
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
