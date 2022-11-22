import React from 'react';
import { ShimmerCircularImage, ShimmerTitle } from 'react-shimmer-effects';
import './LoadingUserProfile.scss'

const LoadingUserProfile = () => {
    return (
        <div className='loading-user-profile-button'>
            <ShimmerCircularImage size={48} className='loading-user-profile-avatar'/>
            <ShimmerTitle line={1} className='loading-user-profile-name'/>
        </div>
    );
}

export default LoadingUserProfile;
