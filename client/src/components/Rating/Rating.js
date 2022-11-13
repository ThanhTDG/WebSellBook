import React from 'react';
import { FakeData } from '../../variables/FakeData';
import './Rating.scss'

const Rating = (props) => {
    const bookData = props.bookData
    function bookRatingPointStyle(point) {
        var color = point >= 3.5 ? 'var(--Orange)' : 'var(--Blue)'
        return {
            fontFamily: 'MontserratMedium',
            fontSize: '84px',
            color: `${color}`
        }
    }
    function activeStarColorsStyle(point) {
        var w = 240 - 5
        var dw = point * (w / 5)
        return {
            width: `${dw}px`,
            height: '42px',
            backgroundColor: 'var(--Orange)',
            position: 'absolute',
            top: '1px',
            left: '1px',
            zIndex:'-1'
        }
    }
    function ratingDetailColor(rating) {
        var dw = rating.rate
        var bgColor = 'var(--Orange)'
        switch (rating.title) {
            case 1:
                bgColor = 'var(--DarkOrange)'
                break;
            case 2:
                bgColor = 'var(--DarkBlue)'
                break;
            case 3:
                bgColor = 'var(--Blue)'
                break;
            case 4:
                bgColor = 'var(--LightBlue)'
                break;
            case 5:
                bgColor = 'var(--Orange)'
                break;
            default:
                bgColor = 'var(--DarkOrange)'
        }
        return {
            width: `${dw}%`,
            height: '100%',
            backgroundColor: `${bgColor}`,
            borderRadius: '4px',
        }
    }
    function getRatingDetail(ratings){
        var rs =[]
        for(let i=0; i< ratings.length; i++){
            rs.push({
                title: i+1,
                amount: ratings[i].amount,
                rate: ratings[i].rate
            })
        }
        return rs
    }
    return (
        <div className='rating-container'>
            <span className='bd-more-title'>Đánh giá </span>
            <div className='rating-total-container'>
                <div className='rating-total-value'>
                    <span style={bookRatingPointStyle(bookData.rating)}>{(Math.round(bookData.rating* 100) / 100).toFixed(1)}</span>
                </div>
                <div className='rating-total-desc'>
                    <div className='rating-stars-container'>
                        <img src={require('../../assets/icons/ic-stars.png')} alt='stars' />
                        <div style={activeStarColorsStyle(bookData.rating)}></div>
                    </div>
                    <div className='rating-total-review'>
                        <span>{bookData.numOfReviews} lượt đánh giá</span>
                    </div>
                </div>
            </div>
            {getRatingDetail(bookData.ratingRate).map((rating) => (
                <div className='row rating-detail'>
                    <div className='col-1'>{rating.title}</div>
                    <div className='col-6 rating-detail-container'>
                        <div className='rating-detail-color' style={ratingDetailColor(rating)}></div>
                    </div>
                    <div className='col-2 rating-persent'>{rating.rate}%</div>
                    <div className='col-2 rating-review'>{rating.amount}</div>
                </div>
            ))}
        </div>
    );
}

export default Rating;
