import React from 'react';
import { Link } from 'react-router-dom';
import { MyVariable } from '../../variables/variables';
import './Menu.scss'
const Menu = (props) => {
    setActiveMenu(props.active)
    return (
        <div id='menu-bounder'>
            <div id='menu-header' class="row">
                <div id='logo-container' class="col-sm">
                    <img src={require('../../assets/Logo.gif')} alt='Logo' />
                </div>
                <div id='search-bar-container' class="col-sm ">
                    <input type='text' id='search-bar' placeholder={MyVariable.PlacseHolderForSearchBar} />
                    <img src={require('../../assets/icons/ic-search.png')} alt='search icon' />
                </div>
                <div id='btn-login-container' class="col-sm ">
                    <button id='btn-login'>Đăng nhập</button>
                </div>
            </div>
            <div className='menu-component row'>
                {MyVariable.MenuData.map((menu) => (
                    <div className='menu-parent-content col-12'
                        id={menu.active === 'true' ? 'active-menu-parent' : 'inactive-menu-parent'}
                    >
                        <Link to={menu.path}><a href='/'>{menu.title}</a></Link>
                    </div>
                ))}
            </div>
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
