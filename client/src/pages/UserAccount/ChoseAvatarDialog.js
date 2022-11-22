import React, { useState } from 'react';
import Modal from 'react-modal'
import { useStore, actions } from '../../store';
import './ChoseAvatarDialog.scss'
import * as AuthServices from '../../apiServices/AuthServices'

const ChoseAvatarDialog = (props) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [state, dispatch] = useStore()
    const [isUpdating, setIsUpdating] = useState(false)
    // const [isOpen, setIsOpen] = useState(false)
    // function toggleModal(){
    //     setIsOpen(!isOpen)
    // }

    function onUpdateAvatar() {
        setIsUpdating(true)
        const formData = new FormData();
        formData.append(
            "avatar",
            selectedImage,
            selectedImage.name
        )
        setIsUpdating(true)
        updateUserAvatar(formData)
    }
    const updateUserAvatar= async (avatar) => {
        let updateAvatar = await AuthServices.changeAvatar(avatar)
        reGetpProfile()
        setSelectedImage(null)
        setIsUpdating(false)
    }

    const reGetpProfile = async () => {
        const profile = await AuthServices.profile()
        dispatch(actions.setUserProfile(profile))
    }
    const loginFormLoadingStyle={
        display: isUpdating? 'flex': 'none'
    }


    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                onRequestClose={props.handleAvatarDialog}
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
                        <div className='dialog-title'><span>Cập nhật ảnh đại diện</span></div>
                        <div className='review-avatar'>
                            <img className='img-display-avatar' alt="not fount" src={selectedImage ? URL.createObjectURL(selectedImage) : state.userProfile.avatar} />
                            {selectedImage && (
                                <button onClick={() => setSelectedImage(null)}><img src={require('../../assets/icons/ic-close.png')} alt='remove-img' /></button>
                            )}
                        </div>
                        <div className='avatar-options'>
                            {
                                selectedImage === null && (
                                    <div>
                                        <label className='avatar-option' htmlFor='input-chose-avatar'>
                                            <span>Chọn hình ảnh</span>
                                        </label>
                                        <input id='input-chose-avatar' type={"file"} name="myImage"
                                            onChange={(event) => {
                                                console.log(event.target.files[0]);
                                                setSelectedImage(event.target.files[0]);
                                            }} />
                                    </div>
                                )
                            }
                            {
                                selectedImage && (
                                    <button className='avatar-option save-change-avatar' onClick={onUpdateAvatar}>Lưu</button>
                                )
                            }
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default ChoseAvatarDialog;
