import React, { useState } from 'react';
import './LoginButton.scss'
import Modal from 'react-modal'
import { MyVariable } from '../../variables/variables';
import { useStore, actions } from '../../store';
import * as AuthServices from '../../apiServices/AuthServices'
// import Modal from 'react-bootstrap/Modal';

const LoginButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegister, setRegister] = useState(false);
    const [isLogin, setLogin] = useState(true);
    const [state, dispatch] = useStore()


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

    const fetchUserSignIn = async()=>{
        const userToken = await AuthServices.signIn('khachhang@example.com','1234abcd')
    }

    function onLoginByUser(){
        fetchUserSignIn()

        dispatch(actions.loginByUser('user account'))
        setIsOpen(!isOpen)
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
                >
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
                                        <button type="submit" class="" onClick={()=>onLoginByUser()}>Đăng nhập</button>
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
                                <div class="form-group">
                                    <label for="">Họ và tên</label>
                                    <input type="text" class="form-control" id="" placeholder="Nhập họ và tên ... " />
                                </div>
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="email" class="form-control" id="" placeholder="Nhập địa chỉ email..." />
                                </div>
                                <div class="form-group">
                                    <label for="">Số điện thoại</label>
                                    <input type="phone" class="form-control" id="" placeholder="Gồm 10 số..." />
                                </div>
                                <div class="form-group">
                                    <label for="">Mật khẩu</label>
                                    <input type="password" class="form-control" id="" placeholder="Gồm ít nhất 8 kí tự..." />
                                    <input type="password" class="form-control" id="" placeholder="Nhập lại mật khẩu..." />
                                </div>
                                <div class="form-group register-form-bottom-container">
                                    <button type="submit" onClick={switchForm} class="">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-7 '>
                            <div style={rightColStyle} className='login-form-right-image'>
                            </div>
                            <button id='btn-close-login' className='btn-in-login-form-close'  onClick={toggleModal}>
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