import React from 'react';
import BookStyleSmall from './Book';
import { FakeData } from '../../../variables/FakeData';
import './Books.scss'

const BooksStyleSmall = () => {
    return (
        <div className='books-style-container'>
            {FakeData.books.map((book)=>(
                <BookStyleSmall bookData={book} />
            ))}
        </div>
    );
}

export default BooksStyleSmall;
