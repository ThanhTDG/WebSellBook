import React from 'react';
import { ShimmerText, ShimmerThumbnail, ShimmerTitle } from 'react-shimmer-effects';
import '../DisplayBook.scss'
import './LoadingDisplayBook.scss'

const LoadingDisplayBook = () => {
    return (
        <div className='display-book-container shimmer-book-container'>
            <div className='image-container'>
                <ShimmerThumbnail className='main-image shimmer-main-image' width={200} height={340} rounded/>
                <div className='sub-images'>
                    <div className='sub-images-responsive-container'>
                        <div className='sub-images1'>
                            <ShimmerThumbnail  className={'sub-image shimmer-sub-image'} width={40} height={64} rounded/>
                            <ShimmerThumbnail  className={'sub-image shimmer-sub-image shimmer-sub-image-last'} width={40} height={64} rounded/>
                        </div>
                    </div>
                    <div className='content-container'>
                        <div className='contents'>
                            <ShimmerText/>
                        </div>
                        <div className='prices-container'>
                            <ShimmerTitle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingDisplayBook;
