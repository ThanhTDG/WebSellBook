import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as bookDetail from '../../apiServices/bookDetailService'
import AddToCardButton from '../../components/Button/AddToCardButton';
import AddToFavoriteButton from '../../components/Button/AddToFavoriteButton';
import Comments from '../../components/Comment/Comments/Comments';
import Menu from '../../components/Menu/Menu';
import Rating from '../../components/Rating/Rating';
import YourRating from '../../components/Rating/YourRating/YourRating';
import './BookDetail.scss'
import LoadingBookDetail from './Loading/LoadingBookDetail';

const BookDetail = () => {
    const location = useLocation()
    const { bookId } = location.state

    const [isLoading, setIsLoading] = useState(true)
    const [apiBookDetail, setApiBookDetail] = useState({})

    const fetchApiDetail = async (id) => {
        const bookDetailResult = await bookDetail.bookDetail(id)
        setIsLoading(false)
        setApiBookDetail(bookDetailResult)
        console.log(bookDetailResult)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchApiDetail(bookId)
    }, [bookId])

    const rederLoadingBookDetail = <div><LoadingBookDetail /></div>

    //--render data
    const [viewImageNumber, setViewImageNumber] = useState(0)

    function imagesSliderData() {
        var result = []
        if (isLoading === false) {
            let size = apiBookDetail.images.length > 4 ? 4 : apiBookDetail.images.length
            for (let z = 0; z < size; z++) {
                result.push({
                    order: z,
                    image: apiBookDetail.images[z]
                })
            }
        }
        return result
    }

    const mainImageStyle = {
        background: `url(${isLoading === false ? apiBookDetail.images[viewImageNumber] : ''}) center center`,
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '380px',
        backgroundSize: '100%'
    }
    const imgSliderStyle = (items) => ({
        justifyContent: items <= 2 ? 'left' : 'space-around',
    })
    const imgSliderItemStyle = (img, items) => ({
        background: `url(${img.image}) center center`,
        backgroundRepeat: 'no-repeat',
        width: '80px',
        height: '80px',
        borderRadius: '8px',
        backgroundSize: '100%',
        border: viewImageNumber === img.order ? '2px solid var(--Pink)' : 'none',
        boxShadow: '0px 1px 3px rgba(0,0,0,0.3)',
        marginRight: items <= 2 ? '24px' : '0'
    })

    useEffect(() => {
        var item = document.getElementById('bd-image-main')
        if (item) {
            item.style.backgroundSize = '100%'
        }
    }, [viewImageNumber])

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    function getRattingValue(point) {
        return {
            width: point === 0 ? '100%' : `${point * 100 / 5}%`,
            height: '24px',
            backgroundColor: point === 0 ? 'var(--LightGray)' : 'var(--Orange)'
        }
    }

    const renderBookDetail =
        <div className='row data-book-detail-container'>
            <div className='col-sm-4 bd-left-container'>
                <div className='bd-main-image-container'>
                    <div className='bd-main-image' id='bd-image-main' style={mainImageStyle}></div>
                </div>
                <div className='bd-image-slider' style={imgSliderStyle(isLoading === false ? apiBookDetail.images.length : 0)}>
                    {
                        imagesSliderData().map((img) => (
                            <div className='bd-image-slider-item'
                                style={imgSliderItemStyle(img, isLoading === false ? apiBookDetail.images.length : 0)}
                                onClick={() => setViewImageNumber(img.order)}>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='col-sm-8 bd-right-container'>
                <div className='bd-content-container'>
                    <div className='bd-name'>{apiBookDetail.name}</div>
                    <div className='bd-author'>
                        <span>{apiBookDetail.hasOwnProperty('authors') === true ? 'T??c gi???: ' : 'Nh?? ph??n ph???i: '}</span>
                        {apiBookDetail.hasOwnProperty('authors') === true ? apiBookDetail.author : apiBookDetail.supplier}
                    </div>
                </div>
                <div className='bd-value-container'>
                    <div className='bd-value-rating-container'>
                        <img src={require('../../assets/icons/ic-stars.png')} alt='stars' />
                        <div className='bd-rating-value' style={getRattingValue(apiBookDetail.rating)} />
                    </div>
                    <a href='/'>
                        {
                            apiBookDetail.numOfReviews > 0 ?
                                <span>(Xem t???t c??? {apiBookDetail.numOfReviews} ????nh gi??)</span> :
                                <span>(H??y l?? ng?????i ?????u ti??n ????nh gi??)</span>
                        }
                    </a>
                    <span>???? b??n: {apiBookDetail.sold}</span>
                </div>
                <div className='bd-bottom-content'>
                    <div className='bd-value-prices-container'>
                        <span className='bd-value-original-price'>{formatter.format(parseInt(apiBookDetail.originalPrice))}</span>
                        <span className='bd-value-discount-rate'> - {apiBookDetail.discountRate} %</span>
                        <span className='bd-value-price'>{formatter.format(parseInt(apiBookDetail.price))}</span>
                    </div>
                    <div className='bd-options-container'>
                        <AddToCardButton bookId ={apiBookDetail._id}/>
                        <div className='white-space' />
                        <AddToFavoriteButton />
                    </div>
                </div>
            </div>
        </div>

    function getBookInfo(book) {
        let result = []
        if (book.hasOwnProperty('isbn10') && book.isbn10 !== '')
            result.push({ title: 'ISBN 10', value: book.isbn10 })
        if (book.hasOwnProperty('isbn13') && book.isbn13 !== '')
            result.push({ title: 'ISBN 13', value: book.isbn13 })
        if (book.hasOwnProperty('translators') && book.translators !== '')
            result.push({ title: 'D???ch gi???', value: book.translators })
        if (book.hasOwnProperty('supplier') && book.supplier !== '')
            result.push({ title: '????n v??? ph??n ph???i', value: book.supplier })
        if (book.hasOwnProperty('publisher') && book.publisher !== '')
            result.push({ title: 'Nh?? xu???t b???n', value: book.publisher })
        if (book.hasOwnProperty('publisherDate') && book.publisherDate !== '') {
            let date = new Date(book.publisherDate)
            result.push({ title: 'Ng??y xu???t b???n', value: date.toLocaleString() })
        }
        if (book.hasOwnProperty('weight') && book.weight !== '')
            result.push({ title: 'Tr???ng l?????ng', value: book.weight })
        if (book.hasOwnProperty('dimension') && book.dimension !== '')
            result.push({ title: 'K??ch th?????c', value: book.dimension })
        if (book.hasOwnProperty('page') && book.page !== null)
            result.push({ title: 'S??? trang', value: book.page })
        if (book.hasOwnProperty('bookCover') && book.bookCover !== '')
            result.push({ title: 'Lo???i b??a', value: book.bookCover })
        return result
    }

    const [isShowMoreDesc, setIsShowMoreDesc] = useState(false)

    const rederBookDetailMore =
        <div className='row bdm-container'>
            <div className='col-sm-4 bdm-left-container'>
                <div className='bd-more-title'>Th??ng tin chi ti???t</div>
                {
                    getBookInfo(apiBookDetail).map((info) => (
                        <div className='bdm-info-container'>
                            <span className='bdm-info-title'>{info.title}: </span>
                            <span className='bdm-info-value'>{info.value}</span>
                        </div>
                    ))
                }
            </div>
            <div className='col-sm-8 bdm-right-container'>
                <div className='bd-more-title'>M?? t???</div>
                <div className='bdm-description'>
                    <span>{isShowMoreDesc === false ? apiBookDetail.shortDes : apiBookDetail.description}</span>
                    <button className='bdm-btn-show-desc' onClick={() => setIsShowMoreDesc(!isShowMoreDesc)}>{isShowMoreDesc === false ? 'Xem th??m' : 'Thu nh???.'}</button>
                </div>
            </div>
        </div>

    const renderBookRating =
        <div className='row bd-rating-container'>
            <div className='col-sm-4 bd-rating-left-container'>
                <Rating bookData={apiBookDetail} />
            </div>
            <div className='col-sm-8 bd-rating-right-container'>
                <YourRating bookId={apiBookDetail._id} />
            </div>
        </div>

    const renderBookComment =
        <div className='row bd-comment-container'>
            <div className='col-sm-4 bd-comment-left-container'>
            </div>
            <div className='col-sm-8 bd-comment-right-container'>
                <div className='bd-more-title'>B??nh lu???n</div>
                <Comments bookId={apiBookDetail._id} />
            </div>
        </div>

    return (
        <div>
            <Menu />
            {
                isLoading === true ?
                    rederLoadingBookDetail :
                    renderBookDetail
            }
            {
                isLoading === false ?
                    rederBookDetailMore :
                    ''
            }

            {
                isLoading === false ?
                    renderBookRating :
                    ''
            }

            {
                isLoading === false ?
                    renderBookComment :
                    ''
            }
        </div>
    );
}

export default BookDetail;
