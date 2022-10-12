import React from 'react';
import { useLocation } from 'react-router-dom'
import { MyVariable } from '../../variables/variables';
import AddToCardButton from '../Button/AddToCardButton';
import AddToFavoriteButton from '../Button/AddToFavoriteButton';
import MyFooter from '../Footer/MyFooter';
import Menu from '../Menu/Menu';
import './BookDetail.scss';
import discountImage from '../../assets/icons/discount.png'
import SendComment from '../Button/SendComment';

const BookDetail = () => {
    const location = useLocation();
    const { book } = location.state;
    const bookDescription = book.description.length > 200 ? book.description.substr(0, 1200) : book.description
    const stars = ['/assets/icons/ic-active-star.png',
        '/assets/icons/ic-active-star.png',
        '/assets/icons/ic-active-star.png',
        '/assets/icons/ic-active-star.png',
        '/assets/icons/ic-active-star.png']
    const bookImageStyle = {
        background: `url(${book.image}) center center`,
        'background-size': '400px 400px',
        'background-repeat': 'no-repeat',
        'box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
    const bookAwardStyle = {
        background: `url(${book.award.image}) center center`,
        width: '48px',
        height: '48px'
    }
    const btnDiscountStyle = {
        position: 'relative',
        border: 'none',
        'background-color': 'var(--White)'
    }
    const bookReactionStyle = {
        'margin-top': '6px',
        color: 'var(--Gray)'
    }
    const bookRatingStyle = {
        color: 'var(--Orange)',
        'margin-top': '6px',
        'margin-left': '-32px'
    }
    function starButtonStyle(btn) {
        var bgStyle = `url('${MyVariable.hostName}${btn.activeImage}') center center`
        if (btn.active === 'false') {
            bgStyle = `url('${MyVariable.hostName}${btn.inactiveImage}') center center`
        }
        return {
            width: '48px',
            height: '48px',
            background: bgStyle,
            border: 'none',
            'margin-right': '24px'
        }
    }
    function onClickButtonStar(e, order) {
        resetStarButton();
        MyVariable.ToRatingButtons.forEach((btn) => {
            if (btn.order <= order) {
                btn.active = 'true'
                var otherbtn = document.getElementById(`btn-star-${btn.order}`)
                otherbtn.style.background = `url('${MyVariable.hostName}${btn.activeImage}') center center`
            }
        })
    }
    function resetStarButton() {
        MyVariable.ToRatingButtons.forEach((btn) => {
            btn.active = 'false'
            var otherbtn = document.getElementById(`btn-star-${btn.order}`)
            otherbtn.style.background = `url('${MyVariable.hostName}${btn.inactiveImage}') center center`
        })
    }

    function bookRatingPointStyle(book) {
        var color = book.rating.ratingPoint >= 3.5 ? 'var(--Orange)' : 'var(--Blue)'
        return {
            'font-family': 'MontserratMedium',
            'font-size': '94px',
            color: `${color}`
        }
    }
    function activeStarColorsStyle(book) {
        var w = 240 - 5
        var dw = book.rating.ratingPoint * (w / 5)
        return {
            width: `${dw}px`,
            height: '42px',
            'background-color': 'var(--Orange)',
            position: 'absolute',
            top: '1px',
            left: '1px',
        }
    }
    function ratingDetailColor(rating, book) {
        var dw = Math.round(((rating.reviews / book.rating.totalReview) * 100), 1)
        var bgColor = 'var(--Orange)'
        // eslint-disable-next-line default-case
        switch (rating.title) {
            case 1:
                bgColor = 'var(--DarkOrange)'
                break;
            case 2:
                bgColor = 'var(--Orange)'
                break;
            case 3:
                bgColor = 'var(--Blue)'
                break;
            case 4:
                bgColor = 'var(--LightBlue)'
                break;
            case 5:
                bgColor = 'var(--DarkBlue)'
                break;
        }
        return {
            width: `${dw}%`,
            height: '100%',
            'background-color': `${bgColor}`,
            'border-radius': '4px'
        }
    }
    function onClickFavorite(e, book) {
        if (book.isfavorite === 'false') {
            e.target.src = `${MyVariable.hostName}/assets/icons/ic-active-favorite.png`
            book.isfavorite = 'true'
        } else {
            e.target.src = `${MyVariable.hostName}/assets/icons/ic-none-favorite.png`
            book.isfavorite = 'false'
        }
    }
    function onShowMoreBookDescription(bookdescription) {
        var ddes = document.getElementById('book-description-id')
        ddes.innerHTML = `${bookdescription}`
        var button = document.createElement('button')
        button.innerHTML = ' thu nhỏ'
        button.className = 'btn-showmore'
        button.addEventListener('click', () => onNarrowBookDescription(bookdescription))

        ddes.appendChild(button)
    }
    function onNarrowBookDescription(bookdescription) {
        var ddes = document.getElementById('book-description-id')
        ddes.innerHTML = `${bookdescription.length > 1200 ? bookdescription.substr(0, 1200) : bookdescription}`
        var button = document.createElement('button')
        button.innerHTML = ' ... xem thêm'
        button.className = 'btn-showmore'
        button.addEventListener('click', () => onShowMoreBookDescription(bookdescription))

        ddes.appendChild(button)
    }
    return (
        <div>
            <Menu />
            <div className='book-detail-container row mt-4'>
                <div className='col-md-4'>
                    <div className='book-image' style={bookImageStyle}>
                        {/* <img id='book-favorite'
                            src={book.isfavorite === 'true' ? `${MyVariable.hostName}/assets/icons/ic-active-favorite.png` : `${MyVariable.hostName}/assets/icons/ic-none-favorite.png`}
                            alt='icon favorite'
                            onClick={(e) => onClickFavorite(e, book)} /> */}
                        <div className='book-award-container'>
                            <img src={`${MyVariable.hostName}/assets/book-awards/award-best-saler.png`} alt='award' />
                        </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='book-content'>
                        <div className='row'>
                            <div className='book-title'>{book.title}</div>
                            <div className='book-author'>{book.author}</div>
                            <div className='row book-stars-container'>
                                <div className='col-3 book-react'>
                                    <div className='row'>
                                        {stars.map((star) => (
                                            <div className='col-2'><img className='book-stars' src={`${MyVariable.hostName}${star}`} alt='start' /></div>
                                        ))}

                                    </div>
                                </div>
                                {/* <div className='col-1' style={bookRatingStyle}>5 sao</div> */}
                                <div className='col-3 book-react'><a href='/' style={bookReactionStyle}><div className='book-comment' >5000 đánh giá</div></a></div>
                                <div className='col-5 book-react'><a href='/' style={bookReactionStyle}><div className='book-saler' >5000 đã bán</div></a></div>
                            </div>
                        </div>
                        {/* <div className='book-description overflow-auto'>{book.description}</div> */}
                        <div className='row mt-4'>
                            <div className='col-sm-12 book-prices-container'>
                                <div className='book-prv-price'>
                                    <span className='prv-prices'>{book.prvPrice} vnđ </span>
                                    <span>-{book.discountrate}</span></div>
                                <div className='book-cur-price'>{book.curPrice} vnđ</div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 book-discount-container'>
                                <div>{book.discountcodes.length} mã giảm giá</div>
                                <div className='row'>{book.discountcodes.map((code) => (
                                    <div className='col-xl-2'>
                                        <button style={btnDiscountStyle}>
                                            <img className='discount-image' src={discountImage} alt='discount' />
                                            <div className='discount-content'>giảm {code}</div></button>
                                    </div>
                                ))}</div>
                            </div>
                        </div>
                        <div className='row buttons-container'>
                            <div className='col-xl-6 book-btn-add-to-cart'>
                                <AddToCardButton />
                            </div>
                            <div className='col-xl-6 book-btn-add-to-cart'>
                                <AddToFavoriteButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row book-description-container'>
                <div className='col-sm-4'>
                    <span>Thông tin sách</span>
                    <div className='book-description-info'>
                        {book.info.map((info) => (
                            <div className='row book-info-row'>
                                <div className='col-sm-6 book-info-title'>{info.title}</div>
                                <div className='col-sm-6 book-info-content'>{info.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='col-sm-8 '>
                    <span>Tóm tắt nội dung</span>
                    <div className='book-description overflow-auto' id='book-description-id'>
                        {bookDescription} <button className='btn-showmore' onClick={() => onShowMoreBookDescription(book.description)}> ... xem thêm</button>
                    </div>
                </div>
            </div>
            <div id='book-rating-title'>{MyVariable.BookDetailTitle.mainTitle}</div>
            <div className='row book-rating-container'>
                <div className='col-sm-4'>
                    <div className='row'>
                        <div className='col-sm-4 d-flex' id='book-rating-point-container'>
                            <span id='book-rating-point' style={bookRatingPointStyle(book)}>{(Math.round(book.rating.ratingPoint * 100) / 100).toFixed(1)}</span>
                        </div>
                        <div className='col-sm-8' id='book-rating-stars-container'>
                            <div className='row' id='book-rating-stars'>
                                <img src={require('../../assets/icons/ic-stars.png')} alt='stars' />
                                <div id='active-star-color' style={activeStarColorsStyle(book)}></div>
                            </div>
                            <div className='row book-total-review'>
                                <span>{book.rating.totalReview} lượt đánh giá</span>
                            </div>
                        </div>
                    </div>
                    {book.rating.detail.map((rating) => (
                        <div className='row rating-detail'>
                            <div className='col-1'>{rating.title}</div>
                            <div className='col-6 rating-detail-container'>
                                <div className='rating-detail-color' style={ratingDetailColor(rating, book)}></div>
                            </div>
                            <div className='col-2 rating-persent'>{Math.round(((rating.reviews / book.rating.totalReview) * 100), 1)}%</div>
                            <div className='col-2 rating-review'>{rating.reviews}</div>
                        </div>
                    ))}
                </div>
                <div className='col-sm-8 book-your-rating-container'>
                    <div className='book-your-rating'>
                        <span>{MyVariable.BookDetailTitle.toRatingTitle}</span>
                        <span>{MyVariable.BookDetailTitle.toRatingGuid}</span>
                    </div>
                    <div className='book-your-rating-stars'>
                        {MyVariable.ToRatingButtons.map((btn) => (
                            <button id={`btn-star-${btn.order}`} style={starButtonStyle(btn)} onClick={(e) => (onClickButtonStar(e, btn.order))}>
                            </button>
                        ))}
                    </div>
                    <SendComment />
                </div>
            </div>
            <MyFooter />
        </div>
    );
}

export default BookDetail;