import React, { useState, useEffect } from 'react';
import { MyVariable } from '../../../variables/variables';
import SendComment from '../../Button/SendComment';
import Comments from '../../Comment/Comments/Comments';
import './YourRating.scss'

const YourRating = (props) => {
    const [starsButton, setStarButton] = useState([
        { order: 0, isActive: false },
        { order: 1, isActive: false },
        { order: 2, isActive: false },
        { order: 3, isActive: false },
        { order: 4, isActive: false },
    ])
    const [isClickButton, setIsClickButton] = useState(false)

    function onClickStarButton(button) {
        let temp = starsButton
        temp.forEach(t => {
            t.isActive = false
        })
        for (let i = 0; i <= button.order; i++) {
            temp[i].isActive = true
        }
        setStarButton(temp)
        setIsClickButton(!isClickButton)
    }

    useEffect(() => {
        var btns = document.getElementsByClassName('rating-btn-star')
        Array.from(btns).forEach((btn) => {
            btn.style.backgroundSize = '100%'
        })
    }, [isClickButton]);
    function getStarStyle(star) {
        return {
            background: star.isActive === true ? `url(${MyVariable.hostName}/assets/icons/ic-active-star.png) center center` : `url(${MyVariable.hostName}/assets/icons/ic-none-star.png) center center`,
            width: '40px',
            height: '40px',
            backgroundSize: '100%'
        }
    }
    function renderStarButton() {
        let render = []
        for (let i = 0; i < starsButton.length; i++) {
            render.push(
                <button onClick={() => onClickStarButton(starsButton[i])}>
                    <div className='rating-btn-star' style={getStarStyle(starsButton[i])} />
                </button>
            )
        }
        return render
    }
    return (
        <div className='your-rating-container'>

            <span className='bd-more-title'>Nhận xét của bạn</span>
            <div className='star-button-container'>
                {
                    renderStarButton()
                }
            </div>

            <SendComment />

        </div>
    );
}

export default YourRating;
