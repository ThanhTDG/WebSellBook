import React, {useState} from 'react';
import Book from './Book';
import './Books.scss'

const Books = (props) => {
    const [stateW, setstateW] = useState(window.innerWidth);
    function getDisplayCardHeight(dw, book) {
        var img = new Image()
        img.src = book.image
        var w = img.width
        var h = img.height
        var deltaH = dw <200?168: 200
        var dh = Math.round((((dw * h / w) + (dw * h / w) / 100) + deltaH) / 10)
        return {
            padding: 0,
            margin: '16px 12px',
            'border-radius': '24px',
            'grid-row-end': `span ${dh}`
        }
    }
    const titleStyle = {
        'font-family': 'MontserratBold',
        'font-size': '36px',
        color: `${props.color}`,
        'margin-left': '48px',
        'margin-top': '48px',
        marginBottom: '24px'
    }
    return (
        <div>
            <div style={titleStyle} className='books-title-effect'>{props.title}</div>
            <div class="pin_container">
                {props.bookData.map(book => (
                    <div style={getDisplayCardHeight(stateW<600?168: 294, book)} className='display-card-books-container'>
                        <div className='book-item'>
                            <Book bookData={book} color={props.color} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Books;
