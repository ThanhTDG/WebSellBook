import React, { useState, useEffect } from 'react';
import { FakeData } from '../../../variables/FakeData';
import * as booksServies from '../../../apiServices/booksServices';
import * as FavoriteServices from '../../../apiServices/FavoriteServices'
import LoadingBookFavorite from '../../Loading/LoadingBookFavorite/LoadingBookFavorite';
import FavoriteBook from './FavoriteBook';
import { useStore, actions } from '../../../store';
import './FavoriteBook.scss'

const Favorites = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [apiBooks, setApiBooks] = useState([])
    const [state, dispatch] = useStore()

    useEffect(() => {
        setIsLoading(true)
        getFavoriteBooks()
    }, [])

    // useEffect(() => {
    //     setIsLoading(true)
    //     getFavoriteBooks()
    //     console.log('reload favorite')
    // }, [state.needUpdateFavoriteBooks])

    const getFavoriteBooks = async () => {
        const booksResult = await FavoriteServices.getFavoriteBooks()
        setIsLoading(false)
        console.log('get favorite books', booksResult)
        setApiBooks(booksResult)
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
