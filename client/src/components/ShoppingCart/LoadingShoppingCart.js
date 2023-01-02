import React from 'react';
import { ShimmerButton, ShimmerThumbnail, ShimmerTitle } from 'react-shimmer-effects';
import './LoadingShoppingCart.scss'
const LoadingShoppingCart = () => {

    const bookInCartContainer = {
        position: 'relative',
    }
    const priceContainerStyle = {
        position: 'relative'
    }

    return (
        <div className='book-in-cart-container'>
            <div style={bookInCartContainer} className='row responsive-row'>
                <div className='col-sm-3 responsive-col-1 ldbc-image-container'>
                    <ShimmerThumbnail className={'ldbc-thumnail ldbc-margin'} rounded />
                </div>
                <div style={priceContainerStyle} className='col-sm-4 responsive-col-2'>
                    <div className='book-in-cart-contents'>
                        <ShimmerTitle />
                        <ShimmerTitle />
                    </div>
                    <div className='book-in-cart-prices'>
                    </div>
                </div>
                <div className='col-sm-2 book-in-cart-amount-container responsive-col-3'>
                </div>
                <div className='col-sm-3 book-in-cart-price-container responsive-col-4'>
                    <ShimmerButton className={'ldbc-margin'} />
                </div>
            </div>
        </div>
    );
}

export default LoadingShoppingCart;
