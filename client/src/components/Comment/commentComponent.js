import React, { useState } from 'react';
import { MyVariable } from '../../variables/variables';
import './commentComponent.scss'

const CommentComponent = (props) => {
    const commentData = props.commentData
    const stars = []
    var rating = ''
    var ratingStyle = {}
    switch (commentData.rate) {
        case 1:
            rating = 'Cần cải thiện nhiều'
            ratingStyle = { color: 'var(--Red)' }
            break;
        case 2:
            rating = 'Cần cố gắng hơn'
            ratingStyle = { color: 'var(--DarkBlue)' }
            break;
        case 3:
            rating = 'Một số điểm còn thiếu sót'
            ratingStyle = { color: 'var(--Blue)' }
            break;
        case 4:
            rating = 'Tương đối hài lòng'
            ratingStyle = { color: 'var(--Orange)' }
            break;
        case 5:
            rating = 'Rất hài lòng'
            ratingStyle = { color: 'var(--Pink)' }
            break;
        default:
            rating = ''
            break
    }
    for (let i = 1; i <= 5; i++) {
        stars.push({
            order: i,
            image: i <= commentData.rate ? '/assets/icons/ic-active-star.png' : '/assets/icons/ic-none-star.png'
        })
    }

    const [isShowMoreContent, setIsShowMoreContent] = useState(false)

    const commentContent = isShowMoreContent === false && commentData.content.length > 300 ? commentData.content.substr(0, 300) : commentData.content

    const createTime = new Date(commentData.createdAt)

    const renderCommentImage= (images)=>{
        let size = images.length > 4? 4: images.length
        let rs=[]
        for(let i=0; i<size; i++){
            rs.push(<img src={images[i]} alt='img'/>)
        }
        return rs
    }

    return (
        <div className='commment-container'>
            <div className='comment-user-container'>
                <img className='user-avatar' src={`${commentData.user.avatar}`} alt='userAvatar' />
                <div className='user-details-container'>
                    <span className='user-responsive-name'>{commentData.user.fullName}</span>
                    <span className='user-responsive-description'>{'Mô tả người dùng'}</span>
                </div>
            </div>
            <div className='comment-content-container'>
                <div className='rating-info'>
                    <div className='rating-stars'>
                        {stars.map((star) => (
                            <img className='star-image' src={`${MyVariable.hostName}${star.image}`} alt='star' />
                        ))}
                    </div>
                    <span className='rating-info-title' style={ratingStyle}>{rating}</span>
                </div>
                <div className='rating-content'>
                    {commentContent}
                    {
                        commentData.content.length > 300 ?
                            <button onClick={() => setIsShowMoreContent(!isShowMoreContent)}>
                                {
                                    isShowMoreContent === false ? '... xem thêm' : 'thu nhỏ'
                                }
                            </button> :
                            ''
                    }
                </div>
                <div className='comment-images-container'>
                    {
                        commentData.images.length>0?
                        renderCommentImage(commentData.images):
                        ''
                    }
                </div>
                <div className='comment-date'>
                    {createTime.toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default CommentComponent;
