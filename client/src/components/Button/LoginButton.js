import React, { useState } from 'react';
import './LoginButton.scss'
import Modal from 'react-modal'
import { MyVariable } from '../../variables/variables';
import { useStore, actions } from '../../store';
import * as AuthServices from '../../apiServices/AuthServices'
import Cookies from 'js-cookie';

const LoginButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegister, setRegister] = useState(false);
    const [isLogin, setLogin] = useState(true);
    const [state, dispatch] = useStore()
    const [isLoading, setIsLoading] = useState(false)

    const [loginUserProfile, setLoginUserProfile] = useState({})

    function toggleModal() {
        setIsOpen(!isOpen);
    }
    function switchForm() {
        setLogin(!isLogin)
        setRegister(!isRegister)
    }
    const rightColStyle = {
        background: `url('${MyVariable.hostName}/assets/banners/3d-keyboard.png') center right`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '84vh',
        borderRadius: '0px 24px 24px 0px',
        marginTop: '-1px',
        padding: '0',
        backgroundSize: '100% 98%'
    }
    var registerStyle = {
        display: isRegister === true ? 'flex' : 'none'
    }
    var loginStyle = {
        display: isLogin === true ? 'flex' : 'none'
    }

    const login = async (username, password) => {
        const userResult = await AuthServices.login(username, password)
        console.log(userResult)
        if (userResult !== false) {
            dispatch(actions.loginByUser('user account'))
            setIsLoading(false)
            setIsOpen(!isOpen)
            profile()
            //console.log('cookies', Cookies.get('token'))
        }
        return userResult
        //dispatch(actions.loginByUser())
    }

    const profile = async () => {
        const profile = await AuthServices.profile()
        setLoginUserProfile(profile)
        dispatch(actions.setUserProfile(profile))
    }

    function onLoginByUser() {
        let userLoginInfo = getLoginInfo()
        //username = 'khachhang@example.com', password = '1234abcd'
        login(userLoginInfo.username, userLoginInfo.password)
        setIsLoading(true)
        //login('haclamthien@gmail.com', '14092001')
        
    }

    function getLoginInfo() {
        let username = document.getElementById('InputUserName')
        let password = document.getElementById('InputPasswordLogin')
        return {
            username: username.value,
            password: password.value
        }
    }

    function onRegisterUser() {
        let userRegisterInfo = getRegisterInfo()
        if (userRegisterInfo === false) {
            console.log('err password')
            return
        }
        console.log('register info: ', userRegisterInfo)
        let signUp = AuthServices.signUp(userRegisterInfo)
        switchForm()

    }
    function getRegisterInfo() {
        let lastName = document.getElementById('register-last-name').value
        let firstName = document.getElementById('register-first-name').value
        let email = document.getElementById('register-email').value
        let phoneNumber = document.getElementById('register-phone-number').value
        let password = document.getElementById('register-password').value
        let rePassword = document.getElementById('register-re-password').value
        if (password !== rePassword)
            return false
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phoneNumber,
            password: password
        }

    }
    const loginFormLoadingStyle ={
        display: isLoading? 'flex': 'none',
    }
    return (

        <div>
            <div className='btn-login-container'>
                <button onClick={toggleModal} >Đăng nhập</button>
            </div>
            <div className='login-modal-container'>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    ariaHideApp={false}
                >
                    <div className='login-form-loading-container' style={loginFormLoadingStyle}>
                        <img src={require('../../assets/icons/loading-none-background.gif')} alt='loading' />
                    </div>
                    <div className='row login-form-display-container' style={loginStyle}>

                        <div className='col-sm-5'>
                            <div className='login-form-bounder'>
                                <div className='login-title'>
                                    <span id='login-title'>Chào mừng</span>
                                    <span id='login-sub-title'>Vui lòng đăng nhập vào tài khoản của bạn</span>
                                </div>
                                <div className='form login-form'>
                                    <div class="form-group">
                                        <label for="InputUserName">Tên đăng nhập</label>
                                        <input type="text" class="form-control" id="InputUserName" placeholder="Email hoặc số điện thoại ... " />
                                    </div>
                                    <div class="form-group">
                                        <label for="InputPasswordLogin">Mật khẩu</label>
                                        <input type="password" class="form-control" id="InputPasswordLogin" placeholder="Gồm ít nhất 8 ký tự..." />
                                    </div>
                                    <div class="form-group">
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <a href='.' className='login-form-hide with-left'>Lưu tài khoản</a>
                                            </div>
                                            <div className='col-sm-6'>
                                                <a href='.' className='login-form-hide with-right'>Quên mật khẩu?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group login-form-bottom-container">
                                        <button type="submit" class="" onClick={() => onLoginByUser()}>Đăng nhập</button>
                                        <span>Chưa có tài khoản? </span><span onClick={switchForm} className='login-form-highlight'>Đăng ký ngay</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-7'>
                            <div style={rightColStyle} className='login-form-right-image'>
                            </div>
                            <button id='btn-close-login' className='btn-in-login-form-close' onClick={toggleModal}>
                                <img src={require('../../assets/icons/ic-close.png')} alt='close' />
                            </button>
                        </div>
                    </div>

                    {/* Register */}

                    <div className='row register-form-display-container' style={registerStyle}>
                        <div className='col-sm-5'>
                            <div className='form register-form'>
                                <div className='register-form-names'>
                                    <div class="form-group">
                                        <label >Họ và tên lót</label>
                                        <input type="text" class="form-control" id="register-last-name" placeholder="Nhập họ và tên đệm... " />
                                    </div>
                                    <div class="form-group lastname-group">
                                        <label >Tên</label>
                                        <input type="text" class="form-control" id="register-first-name" placeholder="Nhập tên ... " />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label >Email</label>
                                    <input type="email" class="form-control" id="register-email" placeholder="Nhập địa chỉ email..." />
                                </div>
                                <div class="form-group">
                                    <label >Số điện thoại</label>
                                    <input type="phone" class="form-control" id="register-phone-number" placeholder="Gồm 10 số..." />
                                </div>
                                <div class="form-group">
                                    <label >Mật khẩu</label>
                                    <input type="password" class="form-control" id="register-password" placeholder="Gồm ít nhất 8 kí tự..." />
                                    <input type="password" class="form-control" id="register-re-password" placeholder="Nhập lại mật khẩu..." />
                                </div>
                                <div class="form-group register-form-bottom-container">
                                    <button type="submit" onClick={onRegisterUser} class="">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-7 '>
                            <div style={rightColStyle} className='login-form-right-image'>
                            </div>
                            <button id='btn-close-login' className='btn-in-login-form-close' onClick={toggleModal}>
                                <img src={require('../../assets/icons/ic-close.png')} alt='close' />
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default LoginButton;