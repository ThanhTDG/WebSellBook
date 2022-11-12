import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as bookDetail from '../../apiServices/bookDetailService'
import AddToCardButton from '../../components/Button/AddToCardButton';
import AddToFavoriteButton from '../../components/Button/AddToFavoriteButton';
import Menu from '../../components/Menu/Menu';
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
                        <span>{apiBookDetail.hasOwnProperty('authors') === true ? 'Tác giả: ' : 'Nhà phân phối: '}</span>
                        {apiBookDetail.hasOwnProperty('authors') === true ? apiBookDetail.author : apiBookDetail.supplier}
                    </div>
                </div>
                <div className='bd-value-container'>
                    <div className='bd-value-rating-container'>
                        <img src={require('../../assets/icons/ic-stars.png')} alt='stars' />
                        <div className='bd-rating-value' style={getRattingValue(apiBookDetail.rating)} />
                    </div>
                    <a href='/'>(Xem tất cả {apiBookDetail.numOfReviews} đánh giá)</a>
                    <span>Đã bán: {apiBookDetail.sold}</span>
                </div>
                <div className='bd-bottom-content'>
                    <div className='bd-value-prices-container'>
                        <span className='bd-value-original-price'>{apiBookDetail.originalPrice} đ</span>
                        <span className='bd-value-discount-rate'> -{apiBookDetail.discountRate} %</span>
                        <span className='bd-value-price'>{apiBookDetail.price} đ</span>
                    </div>
                    <div className='bd-options-container'>
                        <AddToCardButton />
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
            result.push({ title: 'Dịch giả', value: book.translators })
        if (book.hasOwnProperty('supplier') && book.supplier !== '')
            result.push({ title: 'Đơn vị phân phối', value: book.supplier })
        if (book.hasOwnProperty('publisher') && book.publisher !== '')
            result.push({ title: 'Nhà xuất bản', value: book.publisher })
        if (book.hasOwnProperty('publisherDate') && book.publisherDate !== '')
            result.push({ title: 'Ngày xuất bản', value: book.publisherDate })
        if (book.hasOwnProperty('weight') && book.weight !== '')
            result.push({ title: 'Trọng lượng', value: book.weight })
        if (book.hasOwnProperty('dimension') && book.dimension !== '')
            result.push({ title: 'Kích thước', value: book.dimension })
        if (book.hasOwnProperty('page') && book.page !== null)
            result.push({ title: 'Số trang', value: book.page })
        if (book.hasOwnProperty('bookCover') && book.bookCover !== '')
            result.push({ title: 'Loại bìa', value: book.bookCover })
        return result
    }

    const [isShowMoreDesc, setIsShowMoreDesc] = useState(false)

    const rederBookDetailMore =
        <div className='row bdm-container'>
            <div className='col-sm-4 bdm-left-container'>
                <div className='bd-more-title'>Thông tin chi tiết</div>
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
                <div className='bd-more-title'>Mô tả</div>
                <div className='bdm-description'>
                    <span>{isShowMoreDesc===false?apiBookDetail.shortDes: apiBookDetail.description}</span>
                    <button className='bdm-btn-show-desc' onClick={()=>setIsShowMoreDesc(!isShowMoreDesc)}>{isShowMoreDesc===false?'Xem thêm': 'Thu nhỏ.'}</button>
                </div>
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
        </div>
    );
}

export default BookDetail;
