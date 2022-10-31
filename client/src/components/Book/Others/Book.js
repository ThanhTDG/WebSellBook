import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Book.scss'
import { Icons } from './Images';
const BookStyleSmall = (props) => {
    const [isShopping, setIsShopping] = useState(false)
    const [isHoverBookImage, setHoverBookImage] = useState(false)

    const bookStyleImage = {
        background: `url(${props.bookData.image}) center center`,
        width: '100%',
        height: '288px',
        backgroundSize: '152%',
        backgroundRepeat: 'no-repeat',
        borderRadius: '12px',
        filter: isHoverBookImage === true ? 'brightness(0.6)' : 'none'
    }
    function onClickShoppingBtn() {
        setIsShopping(!isShopping)
    }
    const btnAddToCart = {
        fontSize: '10px',
        backgroundColor: isShopping === true ? 'var(--DarkBlue)' : 'var(--White)',
        border: isShopping === true ? 'none' : '2px solid var(--Red)',
        borderRadius: '20px',
        height: '40px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: isShopping === true ? '5.5px' : '4px',
        color: isShopping === true ? 'var(--White)' : 'var(--Orange)',
    }
    var btnAddToCartIcon = isShopping === false ? Icons.plusIcon : Icons.selectedIcon

    var btnContainBookImageStyle = {
        width: '100%',
        border: 'none',
        padding: isHoverBookImage === false ? '8px' : '0px',
        backgroundColor: 'var(--White)'
    }
    function onHoverBookImage() {
        setHoverBookImage(true)
    }
    function onLeaveBookImage() {
        setHoverBookImage(false)
    }
    var bookStyleContainerStyle = {
    }
    return (
        <div className='book-style-bounder'>
            <Link to='/bookdetail' state={{ book: props.bookData }}>
                <button style={btnContainBookImageStyle} onMouseOver={onHoverBookImage} onMouseLeave={onLeaveBookImage}>
                    <div style={bookStyleContainerStyle} className='book-style-container'>
                        <div className='book-style-image' style={bookStyleImage}></div>
                    </div>
                </button>

                <div className='book-style-content'>
                    <span className='book-style-title'>{props.bookData.title}</span>
                    <span className='book-style-author'>{props.bookData.author}</span>
                </div>
                <div className='book-style-details'>
                    <div>{props.bookData.rating.ratingPoint} <img src={require('../../../assets/icons/ic-active-star.png')} alt='star'></img></div>
                    <div className='book-style-details-viewed'>Đã bán {props.bookData.rating.totalReview}</div>
                </div>
            </Link>
            <div className='book-style-prices-container'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <span className='book-style-prv-price'>{props.bookData.prvPrice} đ</span>
                        <span className='book-style-discount-rate'> -{props.bookData.discountrate}</span>
                        <span className='book-style-cur-price'>{props.bookData.curPrice} đ</span>
                    </div>
                    <div className='col-sm-6'>
                        <button style={btnAddToCart} onClick={onClickShoppingBtn}>
                            <img className='icon-cart' src={require('../../../assets/icons/ic-cart.png')} alt='cart icon' />
                            <img src={btnAddToCartIcon} alt='plus' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookStyleSmall;
