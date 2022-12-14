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
                <button onClick={toggleModal} >????ng nh???p</button>
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
                                    <span id='login-title'>Ch??o m???ng</span>
                                    <span id='login-sub-title'>Vui l??ng ????ng nh???p v??o t??i kho???n c???a b???n</span>
                                </div>
                                <div className='form login-form'>
                                    <div class="form-group">
                                        <label for="InputUserName">T??n ????ng nh???p</label>
                                        <input type="text" class="form-control" id="InputUserName" placeholder="Email ho???c s??? ??i???n tho???i ... " />
                                    </div>
                                    <div class="form-group">
                                        <label for="InputPasswordLogin">M???t kh???u</label>
                                        <input type="password" class="form-control" id="InputPasswordLogin" placeholder="G???m ??t nh???t 8 k?? t???..." />
                                    </div>
                                    <div class="form-group">
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <a href='.' className='login-form-hide with-left'>L??u t??i kho???n</a>
                                            </div>
                                            <div className='col-sm-6'>
                                                <a href='.' className='login-form-hide with-right'>Qu??n m???t kh???u?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group login-form-bottom-container">
                                        <button type="submit" class="" onClick={() => onLoginByUser()}>????ng nh???p</button>
                                        <span>Ch??a c?? t??i kho???n? </span><span onClick={switchForm} className='login-form-highlight'>????ng k?? ngay</span>
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
                                        <label >H??? v?? t??n l??t</label>
                                        <input type="text" class="form-control" id="register-last-name" placeholder="Nh???p h??? v?? t??n ?????m... " />
                                    </div>
                                    <div class="form-group lastname-group">
                                        <label >T??n</label>
                                        <input type="text" class="form-control" id="register-first-name" placeholder="Nh???p t??n ... " />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label >Email</label>
                                    <input type="email" class="form-control" id="register-email" placeholder="Nh???p ?????a ch??? email..." />
                                </div>
                                <div class="form-group">
                                    <label >S??? ??i???n tho???i</label>
                                    <input type="phone" class="form-control" id="register-phone-number" placeholder="G???m 10 s???..." />
                                </div>
                                <div class="form-group">
                                    <label >M???t kh???u</label>
                                    <input type="password" class="form-control" id="register-password" placeholder="G???m ??t nh???t 8 k?? t???..." />
                                    <input type="password" class="form-control" id="register-re-password" placeholder="Nh???p l???i m???t kh???u..." />
                                </div>
                                <div class="form-group register-form-bottom-container">
                                    <button type="submit" onClick={onRegisterUser} class="">????ng k??</button>
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