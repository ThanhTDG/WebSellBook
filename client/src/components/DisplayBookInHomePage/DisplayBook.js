import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCardButton from '../Button/AddToCardButton';
import AddToFavoriteButton from '../Button/AddToFavoriteButton';
import './DisplayBook.scss'

const DisplayBook = (props) => {
    const book = props.book
    const subImages1 = [0, 1]
    const subImages2 = [2, 3]
    const [mainImage, setMainImage] = useState(0)
    function getMainImageStyle() {
        return {
            backgroundImage: `url(${book.images.length < mainImage ? book.images[0] : book.images[mainImage]})`,
            backgroundPosition: 'center',
            width: '224px',
            height: '340px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '180% 110%',
            borderRadius: '12px'
        }
    }
    function getSubImageStyle(index) {
        return {
            backgroundImage: `url(${book.images.length < index ? book.images[book.images.length] : book.images[index]})`,
            backgroundPosition: 'center',
            width: '52px',
            height: '52px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '164%',
            borderRadius: '8px'
        }
    }
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <div className='display-book-container'>
            <div className='image-container'>
                <div className='main-image'>
                    <div className='main-image-item' style={getMainImageStyle()}>
                    </div>
                    <div className='options-container'>
                        <AddToCardButton bookId={book._id} />
                        <div className='options-spaces'></div>
                        <AddToFavoriteButton bookId={book._id} isSelected={false} isFavoritePage={false}/>
                    </div>
                </div>

                <div className='sub-images'>
                    <div className='sub-images-responsive-container'>
                        <div className='sub-images1'>
                            {
                                subImages1.map((subImage) => (
                                    <div className='sub-image' key={subImage} style={getSubImageStyle(subImage)} />
                                ))
                            }
                        </div>
                        <div className='sub-images2'>
                            {
                                subImages2.map((subImage) => (
                                    <div className='sub-image' key={subImage} style={getSubImageStyle(subImage)} />
                                ))
                            }
                        </div>
                    </div>
                    <div className='content-container'>
                        <Link to='/bookdetail' state={{ bookId: book._id }}>
                            <div className='contents'>
                                <span className='display-book-title'>{book.name.length > 32 ? book.name.substring(0, 32) + '...' : book.name}</span>
                                <span className='sub-title'>{book.hasOwnProperty('authors') ? book.authors : book.supplier}</span>
                            </div>
                        </Link>
                        <div className='prices-container'>
                            <div className='prv-prices-container'>
                                <span className='prv-price'>{formatter.format(parseInt(book.originalPrice))}</span>
                                <span className='discount-rate'> -{book.discountRate} %</span>
                            </div>
                            <span className='cur-price'>{formatter.format(parseInt(book.price))}</span>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default DisplayBook;
