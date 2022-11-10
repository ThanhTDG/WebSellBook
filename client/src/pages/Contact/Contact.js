import React from 'react';
import { FormGroup } from 'react-bootstrap';
import ImageSlider from '../../components/Carousel/ImageSlider';
import MyFooter from '../../components/Footer/MyFooter';
import Menu from '../../components/Menu/Menu';
import { MyVariable } from '../../variables/variables';
import './Contact.scss';

const ContactUs = () => {
    var banners = []
    MyVariable.Banners.forEach((banner) => (
        banners.push({
            url: `${MyVariable.hostName}${banner.url}`,
            title: `${banner.title}`,
            backColor: `${banner.backColor}`
        })
    ))
    return (
        <div>
            <Menu active='Liên Hệ'></Menu>
            <div className='contact-us-banner'>
                {/* <ImageSlider slides={banners} /> */}
            </div>
            <div>
                <div className='row no-margin-padding'>
                    <div className='col-sm-4 contact-content-container'>
                        <div className='display-contact-info'>
                            <img src={require('../../assets/icons/ic-phone.png')} alt='contact-phone'></img>
                        </div>
                        <div className='display-contact-info'>
                            <span className='display-contact-title'>Điện thoại</span>
                        </div>
                        <div className='display-contact-info'>
                            <span>{MyVariable.FooterData.contactUs.phoneNumber}</span>
                        </div>

                        <div className='display-contact-info'>
                            <img src={require('../../assets/icons/ic-mail.png')} alt='contact-phone'></img>
                        </div>
                        <div className='display-contact-info'>
                            <span className='display-contact-title'>Email</span>
                        </div>
                        <div className='display-contact-info'>
                            <span>{MyVariable.FooterData.contactUs.email}</span>
                        </div>

                        <div className='display-contact-info'>
                            <img src={require('../../assets/icons/ic-location.png')} alt='contact-phone'></img>
                        </div>
                        <div className='display-contact-info'>
                            <span className='display-contact-title'>Địa chỉ</span>
                        </div>
                        <div className='display-contact-info'>
                            <span>{MyVariable.FooterData.contactUs.address}</span>
                        </div>
                    </div>
                    <div className='col-sm-8 contact-container-col'>
                        <div id='contact-title'>Liên hệ chúng tôi</div>
                        <form id='contact-form'>
                            <input id='contact-form-name' type='text' placeholder='Tên của bạn là gì?'></input>
                            <input id='contact-form-email' type='email' placeholder='Chúng tôi có thể liên hệ cho bạn tại...'></input>
                            <textarea id='contact-from-content' placeholder='Góp ý của bạn với chúng tôi là gì?'></textarea>
                            <div className='contact-submit-button-container'>
                                <button type='submit'>Góp ý</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <MyFooter />
        </div>
    );
}

export default ContactUs;
