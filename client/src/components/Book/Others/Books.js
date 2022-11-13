import React, { useState, useEffect } from 'react';
import BookStyleSmall from './Book';
import * as booksServies from '../../../apiServices/booksServices'
import { FakeData } from '../../../variables/FakeData';
import './Books.scss'
import LoadingBookFavorite from '../../Loading/LoadingBookFavorite/LoadingBookFavorite';
import { useStore, actions } from '../../../store';

const BooksStyleSmall = () => {
    const [state, dispatch] = useStore()
    useEffect(() => {
        if(state.categoryId === 'a'){
            console.log('not chose category')
            return
        }
        console.log(state.categoryId)
        setIsLoading(true)
        const fetch = async(categoryId)=>{
            const booksResult = await booksServies.booksByCategoryId(categoryId)
            setIsLoading(false)
            setApiBooks(booksResult.docs)
        }
        fetch(state.categoryId)
    }, [state])

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
