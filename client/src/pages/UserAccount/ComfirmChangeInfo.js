import React, { useState } from 'react';
import { useStore, actions } from '../../store';
import './ChoseAvatarDialog.scss';
import Modal from 'react-modal';
import * as AuthServices from '../../apiServices/AuthServices';

const ComfirmChangeInfo = (props) => {
    const [state, dispatch] = useStore()
    const [currentPassword, setCurrentPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const loginFormLoadingStyle = {
        display: isLoading ? 'flex' : 'none'
    }
    const comfirmPassword = async () => {
        let pw = document.getElementById('comfirm-user-password').value
        if (pw !== '') {
            let verify = await AuthServices.verityAccount(pw)
            console.log('comfirm pw', verify)
            return verify
        }
        return false
    }
    const reGetpProfile = async () => {
        const profile = await AuthServices.profile()
        dispatch(actions.setUserProfile(profile))
    }
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.handleComfirmPasswordDialog}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                ariaHideApp={false}>
                <div className='login-form-loading-container' style={loginFormLoadingStyle}>
                    <img src={require('../../assets/icons/loading-none-background.gif')} alt='loading' />
                </div>
                <button id='btn-close-login' className='btn-in-login-form-close' onClick={props.onCloseModal}>
                    <img src={require('../../assets/icons/ic-close.png')} alt='close' />
                </button>
                <div className='user-chose-avatar-dialog-container'>
                    <div className='review-avatar-container'>
                        <div className='dialog-title'><span>Xác nhận mật khẩu để tiếp tục</span></div>
                        <div className='comfirm-pw-avatar-container'>
                            <div className='comfirm-pw-avatar'>
                                <img src={state.userProfile.avatar} alt='user-avatar' />
                            </div>
                            <div className='comfirm-pw-content'>
                                <span>{state.userProfile.firstName} {state.userProfile.lastName}</span>
                            </div>
                        </div>
                        <form className='info-form'>
                            <div className='user-form-row-container no-margin-padding'>
                                <div className='form-item'>
                                    <label>Mật khẩu</label>
                                    <input type={'password'} id='comfirm-user-password' defaultValue={''}></input>
                                </div>
                            </div>
                        </form>
                        <div className='avatar-options'>
                            <button className='avatar-option save-change-avatar' onClick={async () => {
                                setIsLoading(true)
                                let comfirm = await comfirmPassword()
                                if (comfirm) {
                                    await props.onComfirmPassword(comfirm)
                                    reGetpProfile()
                                    setIsLoading(false)
                                    props.onCloseModal()
                                }else{
                                    setIsLoading(false)
                                }

                            }}>Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ComfirmChangeInfo;
