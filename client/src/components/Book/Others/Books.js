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
        if (state.categoryId === 'a') {
            console.log('not chose category')
            return
        }
        console.log(state.categoryId)
        setIsLoading(true)
        const fetch = async (categoryId, page, sort) => {
            const booksResult = await booksServies.booksByCategoryId(categoryId, page, sort)
            setIsLoading(false)
            setApiBooks(booksResult.docs)
            dispatch(actions.booksNavButtons(getBooksNavButtons(booksResult)))
        }
        fetch(state.categoryId, 1, state.bookSortTyle)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.categoryId])

    useEffect(() => {
        console.log('current page: ' + state.booksPage)
        console.log('category id: ' + state.categoryId)
        if (state.categoryId === 'a') {
            setIsLoading(true)
            fetchApi(state.booksPage)
            return
        }
        setIsLoading(true)
        const fetch = async (categoryId, page, sort) => {
            const booksResult = await booksServies.booksByCategoryId(categoryId, page, sort)
            setIsLoading(false)
            setApiBooks(booksResult.docs)
            console.log(booksResult)
        }
        fetch(state.categoryId, state.booksPage, state.bookSortTyle)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.booksPage])

    useEffect(() => {
        console.log('current page: ' + state.booksPage)
        console.log('category id: ' + state.categoryId)
        if (state.categoryId === 'a') {
            setIsLoading(true)
            fetchApi(state.booksPage)
            return
        }
        setIsLoading(true)
        const fetch = async (categoryId, page, sort) => {
            const booksResult = await booksServies.booksByCategoryId(categoryId, page, sort)
            setIsLoading(false)
            setApiBooks(booksResult.docs)
            console.log(booksResult)
        }
        fetch(state.categoryId, 1, state.bookSortTyle)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.bookSortTyle])

    const [apiBooks, setApiBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        fetchApi(1)
    }, [])

    const fetchApi = async (page) => {
        const booksResult = await booksServies.books(page)
        setIsLoading(false)
        setApiBooks(booksResult.docs)
        console.log(booksResult)
    }

    function getBooksNavButtons(apiBooksResult) {
        return {
            hasNextPage: apiBooksResult.hasNextPage,
            hasPrevPage: apiBooksResult.hasPrevPage,
            nextPage: apiBooksResult.nextPage,
            page: apiBooksResult.page,
            prevPage: apiBooksResult.prevPage,
            totalPages: apiBooksResult.totalPages,
            pagingCounter: apiBooksResult.pagingCounter,
        }
    }

    const renderBooks = isLoading === true ?
        <div className='books-style-container'>
            {FakeData.loading48.map((book) => (
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
