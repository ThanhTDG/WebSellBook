import React from 'react';
import {ShimmerThumbnail } from 'react-shimmer-effects';
import './LoadingCategory.scss'

const LoadingCategory = () => {
    return (
        <div>
            <ShimmerThumbnail height={48} rounded className='loading-category'/>
        </div>
    );
}

export default LoadingCategory;
