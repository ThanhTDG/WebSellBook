import React from 'react';
import Book from './Book';
import './Books.scss'

const Books = (props) => {
    function getDisplayCardHeight(dw, book) {
        var img = new Image()
        img.src = book.image
        var w = img.width
        var h = img.height
        var dh = Math.round((((dw * h / w) + (dw * h / w) / 100) + 240) / 10)
        return {
            padding: 0,
            margin: '16px 12px',
            'border-radius': '24px',
            'grid-row-end': `span ${dh}`
        }
    }
    const titleStyle = {
        'font-family': 'MontserratBold',
        'font-size': '48px',
        color: `${props.color}`,
        'margin-left': '48px',
        'margin-top': '24px',
    }
    return (
        <div>
            <div style={titleStyle}>{props.title}</div>
            <div class="pin_container">
                {props.bookData.map(book => (
                    <div style={getDisplayCardHeight(294, book)}>
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
