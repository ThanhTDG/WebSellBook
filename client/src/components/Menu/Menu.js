import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyConstVariable } from '../../variables/MyConstVaeiable';
import { MyVariable } from '../../variables/variables';
import LoginButton from '../Button/LoginButton';
import {BooksInShoppingCart} from '../ShoppingCart/BooksInShoppingCart'
import './Menu.scss'
import { useStore, actions } from '../../store';
const Menu = (props) => {
    const navigate = useNavigate()
    setActiveMenu(props.active)
    const [isSearchAble, setIsSearchAble] = useState(false)
    //const [booksInCartAmount, setBooksInCartAmount] = useState(BooksInShoppingCart.length)
    const [state, dispatch] = useStore()
    const {booksInCartAmount} = state
    function onSearch() {
        var searchInput = document.getElementById('search-bar');
        var searchValue = searchInput.value
        if (searchValue !== "") {
            navigate('/books', { state: { stateName: searchValue } })
        }
    }
    const displayCartNotifyStyle = {
        width:'24px',
        height:'24px',
        borderRadius:'12px',
        backgroundColor:'var(--Red)',
        fontSize:'12px',
        color:'var(--Darkest)',
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        position:'absolute',
        right:'4px',
        top:'4px',
        fontFamily:'MontserratMedium'
    }
    const noneDisplayCartNotifyStyle ={
        display:'none'
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
                <div class="col-xl-3">
                    <LoginButton />
                </div>
            </div>
            <div className='menu-component row'>
                {MyVariable.MenuData.map((menu) => (
                    <div className='menu-parent-content col-12'
                        id={menu.active === 'true' ? 'active-menu-parent' : 'inactive-menu-parent'}
                    >
                        <Link to={menu.path} state={{ stateName: MyConstVariable.myNullVariable }}><a href='/'>{menu.title}
                        <div style={menu.title==='Giỏ Hàng'? displayCartNotifyStyle: noneDisplayCartNotifyStyle}>
                            {booksInCartAmount}
                        </div>
                        </a></Link>
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
