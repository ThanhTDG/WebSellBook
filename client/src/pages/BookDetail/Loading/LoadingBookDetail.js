import React from 'react';
import { ShimmerButton, ShimmerText, ShimmerThumbnail, ShimmerTitle } from 'react-shimmer-effects';
import './LoadingBookDetail.scss'

const LoadingBookDetail = () => {
    return (
        <div className='row loading-bd-container '>
            <div className='col-sm-4 loading-bd-left-container'>
                <div className='loading-bd-main-image'>
                    <ShimmerThumbnail height={400} rounded />
                </div>
                <div className='loading-bd-images'>
                    <ShimmerThumbnail height={80} className={'tn-imgs'} />
                    <ShimmerThumbnail height={80} className={'tn-imgs'} />
                    <ShimmerThumbnail height={80} className={'tn-imgs'} />
                </div>
            </div>
            <div className='col-sm-8 loading-bd-right-container'>
                <div className='loadding-bd-title'>
                    <ShimmerTitle />
                    <ShimmerText />
                </div>
                <div className='loadding-bd-options'>
                    <ShimmerButton className='loadding-bd-btn' />
                    <div className='white-space'/>
                    <ShimmerButton className='loadding-bd-btn'/>
                </div>
            </div>
        </div>
    );
}

export default LoadingBookDetail;
