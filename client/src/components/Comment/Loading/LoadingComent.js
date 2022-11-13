import React from 'react';
import { ShimmerCircularImage, ShimmerThumbnail, ShimmerTitle } from 'react-shimmer-effects';
import './LoadingComent.scss'

const LoadingComent = () => {
    return (
        <div className='loading-comment-container'>
            <ShimmerCircularImage size={64} />
            <div className='lc-content-container'>
                <ShimmerTitle />
                <ShimmerThumbnail height={80} rounded />
            </div>
        </div>
    );
}

export default LoadingComent;
