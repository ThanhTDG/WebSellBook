import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AddToCardButton from '../../Button/AddToCardButton';
import AddToFavoriteButton from '../../Button/AddToFavoriteButton';
import './FavoriteBook.scss'

const FavoriteBook = (props) => {
    const [isHoverOptionButtons, setIsHoverOptionButtons] = useState(false)
    const bookData = props.bookData
    const userFavoriteBookImageStyle = {
        backgroundImage: `url(${bookData.images[0]})`,
        backgroundPosition:'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: `${props.height}px`,
        backgroundSize: '164%',
        borderRadius: '12px',
        filter: isHoverOptionButtons===true? 'brightness(0.6)': 'none',
        transform: isHoverOptionButtons===true?'scale(1.06)':'none',
        boxShadow:'0px 1px 4px rgba(0,0,0,0.3)'
    }
    return (
        <div className='user-favorite-book-container' onMouseLeave={()=>setIsHoverOptionButtons(false)}>
            <div className='user-favorite-book-bounder'>
                <div className='user-favorite-book-img' style={userFavoriteBookImageStyle}>
                </div>
                <div className='user-favorite-book-options' onMouseOver={()=>setIsHoverOptionButtons(true)}>
                    <AddToCardButton bookId = {bookData._id} />
                    <div className='user-spacing'/>
                    <AddToFavoriteButton bookId = {bookData._id} isSelected={true} isFavoritePage={true}/>
                </div>
            </div>
            <Link to='/bookdetail' state={{ bookId: bookData._id }}>
                <div className='user-favorite-book-content'>
                    <span className='user-favorite-book-title'>{bookData.name}</span>
                    <span className='user-favorite-book-author'>{bookData.hasOwnProperty('author')===true?bookData.author:bookData.supplier}</span>
                </div>
            </Link>
        </div>
    );
}

export default FavoriteBook;
