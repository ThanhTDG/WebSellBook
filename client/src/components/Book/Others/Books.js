import React, { useState, useEffect } from 'react';
import BookStyleSmall from './Book';
import * as booksServies from '../../../apiServices/booksServices'
import { FakeData } from '../../../variables/FakeData';
import './Books.scss'
import LoadingBookFavorite from '../../Loading/LoadingBookFavorite/LoadingBookFavorite';

const BooksStyleSmall = () => {
    const [apiBooks, setApiBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const booksResult = await booksServies.books()
        setIsLoading(false)
        setApiBooks(booksResult.docs)
    }
    const renderBooks = isLoading === true ?
        <div className='books-style-container'>
            {FakeData.books.map((book) => (
                <LoadingBookFavorite height={340} />
            ))}
        </div> :
        <div className='books-style-container'>
            {
                apiBooks.map((book) => (
                    <BookStyleSmall bookData={book} height={'340'} />
                ))
            }
        </div>
    return (
        <div>
            {renderBooks}
        </div>
    );
}

export default BooksStyleSmall;
