import React, { useState, useEffect } from 'react';
import { FakeData } from '../../../variables/FakeData';
import * as booksServies from '../../../apiServices/booksServices';
import LoadingBookFavorite from '../../Loading/LoadingBookFavorite/LoadingBookFavorite';
import FavoriteBook from './FavoriteBook';
import './FavoriteBook.scss'

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [apiBooks, setApiBooks] = useState([])
    useEffect(() => {
        setIsLoading(true)
        fetchApi()
    }, [])

    const fetchApi = async () => {
        const booksResult = await booksServies.books()
        setIsLoading(false)
        setApiBooks(booksResult.docs)
    }
    
    return (
        <div className='option-page-favorites'>
            {
                isLoading === true ?
                    FakeData.books.map((book) => (
                        <LoadingBookFavorite height={280} />
                    )) :
                    apiBooks.map((book) => (
                        <FavoriteBook bookData={book} height='280' />
                    ))
            }
        </div>
    );
}

export default Favorites;
