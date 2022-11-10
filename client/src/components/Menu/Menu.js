import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyConstVariable } from '../../variables/MyConstVaeiable';
import { MyVariable } from '../../variables/variables';
import LoginButton from '../Button/LoginButton';
import { BooksInShoppingCart } from '../ShoppingCart/BooksInShoppingCart'
import './Menu.scss'
import { useStore, actions } from '../../store';
import ClickAwayListener from 'react-click-away-listener';
const Menu = (props) => {
    const navigate = useNavigate()
    setActiveMenu(props.active)
    const [isSearchAble, setIsSearchAble] = useState(false)
    //const [booksInCartAmount, setBooksInCartAmount] = useState(BooksInShoppingCart.length)
    const [state, dispatch] = useStore()
    var { isLogin } = state
    const { booksInCartAmount } = state

    const [isUseUserPopupMenu, setIsUseUserPopupMenu] = useState(false)

    function onSearch() {
        var searchInput = document.getElementById('search-bar');
        var searchValue = searchInput.value
        if (searchValue !== "") {
            navigate('/books', { state: { stateName: searchValue } })
        }
    }
    const displayCartNotifyStyle = {
        width: '24px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: 'var(--Red)',
        fontSize: '12px',
        color: 'var(--Darkest)',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        right: '4px',
        top: '4px',
        fontFamily: 'MontserratMedium'
    }
    const noneDisplayCartNotifyStyle = {
        display: 'none'
    }
    const userOptionStyle = {
        display: isLogin === true ? 'flex' : 'none'
    }
    const loginButtonStyle = {
        display: isLogin === false ? 'flex' : 'none'
    }
    const onUseUserPopupMenu = () => {
        setIsUseUserPopupMenu(!isUseUserPopupMenu)
    }

    const userPopupBacgroundImageStyle = {
        width: '100%',
        height: '100px',
        backgroundColor: 'var(--Blue)',
        position: 'absolute',
        top: '0',
        borderRadius: '8px',
        background: `url('https://pbs.twimg.com/media/Ez2Q2PjUUAIJdK-?format=jpg&name=900x900') center center`,
        bacgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
    }

    return (
        <div id='menu-bounder'>
            <div id='menu-header' class="row">
                <div id='logo-container' class="col-xl-3">
                    <img src={require('../../assets/LogoMain.png')} alt='Logo' />
                </div>
                <div id='search-bar-container' class="col-xl-6">
                    <input type='text' id='search-bar' placeholder={MyVariable.PlacseHolderForSearchBar} />
                    <img src={require('../../assets/icons/ic-search.png')} alt='search icon' onClick={() => onSearch()} />
                </div>
                <div class="col-xl-3 menu-btn-container-col">
                    <div className='menu-btn-login-container' style={loginButtonStyle}><LoginButton /></div>
                    <button className='menu-btn-avtar' style={userOptionStyle}>
                        <img src={require('../../assets/fake-data/avatar.jpg')} alt='avtar' />
                        <span>Kazuha</span>
                    </button>
                    <button className='menu-btn-user-menu-more' style={userOptionStyle} onClick={onUseUserPopupMenu}>
                        <img src={require('../../assets/icons/ic-menu-more.png')} alt='menu-more'></img>
                    </button>
                </div>
            </div>
            <div className='menu-component row'>
                {MyVariable.MenuData.map((menu) => (
                    <div className='menu-parent-content col-12'
                        id={menu.active === 'true' ? 'active-menu-parent' : 'inactive-menu-parent'}
                    >
                        <Link to={menu.path} state={{ stateName: MyConstVariable.myNullVariable }}><a href='/'>{menu.title}
                            <div style={menu.title === 'Giỏ Hàng' ? displayCartNotifyStyle : noneDisplayCartNotifyStyle}>
                                {booksInCartAmount}
                            </div>
                        </a></Link>
                    </div>
                ))}
            </div>
            {isUseUserPopupMenu && (
                <ClickAwayListener onClickAway={() => setIsUseUserPopupMenu(false)}>
                    <div className={`user-menu-more-container ${isUseUserPopupMenu ? "user-popup-menu-active" : "user-popup-menu-inactive"}`}>
                        <div className='user-popup-avatar'>
                            <div className='user-popup-background-image' style={userPopupBacgroundImageStyle}>

                            </div>
                            <img src={require('../../assets/fake-data/avatar.jpg')} alt='avtar' />
                        </div>
                        <p className='user-popup-name no-margin-padding'>Kadezaha Kazuha</p>
                        <p className='user-popup-email no-margin-padding'>kazuha@kadezaha.inazuma.teyvat</p>
                        <div className='user-popup-options'>
                            <button>
                                <img src={require('../../assets/icons/ic-popup-key.png')} alt='password'></img>
                            </button>
                            <button>
                                <img src={require('../../assets/icons/ic-popup-payment.png')} alt='payment'></img>
                            </button>
                            <button>
                                <img src={require('../../assets/icons/ic-popup-location.png')} alt='shipaddress'></img>
                            </button>
                        </div>
                        <div className='user-popup-actions'>
                            <Link to={'/useraccount'}>
                                <div className='user-popup-action'>
                                    <button>
                                        <div className='action-img-container'>
                                            <img src={require('../../assets/icons/ic-setting.png')} alt='' />
                                        </div>
                                        <span>Cài đặt</span>
                                    </button>
                                </div>
                            </Link>
                            <div className='user-popup-action'>
                                <button>
                                    <div className='action-img-container'>
                                        <img src={require('../../assets/icons/ic-logout.png')} alt='' />
                                    </div>
                                    <span>Đăng xuất</span>
                                </button>
                            </div>
                            <div className='user-popup-action'>
                                <button>
                                    <div className='action-img-container'>
                                        <img src={require('../../assets/icons/ic-change.png')} alt='' />
                                    </div>
                                    <span>Sử dụng một tài khoản khác</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </ClickAwayListener>
            )}

        </div>
    );
}
function setActiveMenu(menuTile) {
    MyVariable.MenuData.forEach(menu => {
        if (menu.title === menuTile) {
            menu.active = 'true'
        } else {
            menu.active = 'false'
        }
    });
}

export default Menu;
