import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCardButton from '../../Button/AddToCardButton';
import AddToFavoriteButton from '../../Button/AddToFavoriteButton';
import './Book.scss'
const BookStyleSmall = (props) => {
    const [isHoverOptionButtons, setIsHoverOptionButtons] = useState(false)
    const bookData = props.bookData

    const userFavoriteBookImageStyle = {
        backgroundImage: `url(${bookData.images[0]})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: `${props.height}px`,
        backgroundSize: '164%',
        borderRadius: '12px',
        filter: isHoverOptionButtons === true ? 'brightness(0.6)' : 'none',
        transform: isHoverOptionButtons === true ? 'scale(1.06)' : 'none',
        boxShadow: '0px 1px 4px rgba(0,0,0,0.3)'
    }
    return (
        <div className='book-style-container' onMouseLeave={() => setIsHoverOptionButtons(false)}>
            <div className='user-favorite-book-bounder'>
                <div className='user-favorite-book-img' style={userFavoriteBookImageStyle}>
                </div>
                <div className='user-favorite-book-options' onMouseOver={() => setIsHoverOptionButtons(true)}>
                    <AddToCardButton bookData={bookData} />
                    <div className='user-spacing' />
                    <AddToFavoriteButton />
                </div>
            </div>
            <div className='book-style-nav-container'>
                <Link to='/bookdetail' state={{ bookId: bookData._id}}>
                    <div className='user-favorite-book-content'>
                        <span className='user-favorite-book-title'>{bookData.name.length>40?bookData.name.substring(0, 40) + '...' : bookData.name}</span>
                        <span className='user-favorite-book-author'>{bookData.supplier.length>28?bookData.supplier.substring(0, 28)+'...': bookData.supplier}</span>
                    </div>
                    <div className='book-style-description-containers'>
                        <div className='book-style-values-container'>
                            <div className='book-style-rating-container'>
                                <span>{bookData.rating===0? '-': bookData.rating}</span>
                                <img src={require('../../../assets/icons/ic-active-star.png')} alt='star' />
                            </div>
                            <div className='book-style-sale-figures-container'>
                                <span>Đã bán: {bookData.sold}</span>
                            </div>
                        </div>
                        <div className='book-style-prices-container'>
                            <span className='book-style-prv-price'>{bookData.originalPrice} đ</span>
                            <span className='book-style-cur-price'>{bookData.price} đ</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default BookStyleSmall;
