import React from 'react';
import { ShimmerThumbnail, ShimmerTitle } from 'react-shimmer-effects';
//import Shimmer from "react-shimmer-effect";
import './LoadingBook.scss'

const LoadingBookFavorite = (props) => {
    return (
        <div>
            <ShimmerThumbnail height={props.height} className='shimmer-thumbnai' rounded />
            <ShimmerTitle line={2} gap={10} variant="primary" />
        </div>
    );
}

export default LoadingBookFavorite;
