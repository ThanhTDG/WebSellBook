import React from 'react';
import './MyFooter.scss'
import { MyVariable } from '../../variables/variables';
import { Link } from 'react-router-dom';
import { MyConstVariable } from '../../variables/MyConstVaeiable';

const MyFooter = () => {
    return (
        <div className='footer-component-contain'>
            <div className='row'>
                <div className='col-sm '>
                    <div className='footer-logo'>
                        <img src={require('../../assets/LogoMain.png')} alt='Logo' />
                        {/* <div className='footer-description'>{MyVariable.FooterData.description}</div> */}
                    </div>
                </div>
                <div className='col-sm '>
                    <div className='footer-contact-us'>
                        <div className='footer-title'>{MyVariable.FooterData.contactUs.title}</div>
                        <div className='footer-phone-number'>{MyVariable.FooterData.contactUs.phoneNumber}</div>
                        <div className='footer-contact-us-info'>{MyVariable.FooterData.contactUs.address}</div>
                        <div className='footer-contact-us-info'>{MyVariable.FooterData.contactUs.email}</div>
                        <div className='footer-contact-us-social-medias'>{MyVariable.FooterData.contactUs.social.map((social) => (
                            <a href={social.path} className='social-icon'><img src={`${MyVariable.hostName}${social.image}`} alt='social media icons' /></a>
                        ))}</div>
                    </div>
                </div>
                <div className='col-sm '>
                    <div className='footer-menus'>
                        <div className='footer-title'>{MyVariable.FooterData.cutomerHelper.title}</div>
                        {MyVariable.MenuData.map((menu)=> (
                            <div className='footer-menu'>
                                <Link to={menu.path} state={{stateName: MyConstVariable.myNullVariable}}><a href='/'>{menu.title}</a></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyFooter;
