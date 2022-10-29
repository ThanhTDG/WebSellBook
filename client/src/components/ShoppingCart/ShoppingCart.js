import React, { useState, useEffect, setState } from 'react';
import './ShoppingCart.scss'
import { useStore, actions } from '../../store';
import { BooksInShoppingCart } from './BooksInShoppingCart';

const ShoppingCart = (props) => {
    const [isHoverTrash, setIsHoverTrash] = useState(false)

    const bookData = props.bookData.book
    const [bookAmount, setbookAmount] = useState(props.bookData.amount)
    const [isSelectedBook, setIsSelectedBook] = useState(props.bookData.isSelected)


    const [state, dispatch] = useStore()
    // const { booksInCart } = state
    // const bookDataState = booksInCart.find(item=> item.book.id === bookData.id)

    function onHoverTrash() {
        setIsHoverTrash(true)
    }
    function onNoneHoverTrash() {
        setIsHoverTrash(false)
    }
    const bookInCartImageStyle = {
        background: `url('${bookData.image}') center center`,
        width: '124px',
        height: '164px',
        borderRadius: '12px',
        backgroundSize: '152%',
        backgroundRepeat: 'no-repeat',
        marginLeft: '72px'
    }
    const checkboxStyle = {
        position: 'absolute',
        width: '24px',
        height: '24px',
        accentColor: 'var(--Blue)',
        top: '44%',
        left: '24px'
    }
    const bookInCartContainer = {
        position: 'relative',
    }
    const priceContainerStyle = {
        position: 'relative'
    }

    function onDecreaseBookAmount() {
        setbookAmount(bookAmount === 1 ? 1 : bookAmount - 1)
    }
    function onIncreaseBookAmount() {
        setbookAmount(bookAmount + 1)
    }
    function onChangeCheckbox(e) {
        setIsSelectedBook(e.target.checked)
    }
    function onRemoveBookInCart() {
        dispatch(actions.removeBookInCart(getBookInCart()))
        BooksInShoppingCart.forEach(item => {
            if (item.book.id === props.bookData.book.id) {
                let index = BooksInShoppingCart.indexOf(item)
                BooksInShoppingCart.splice(index, 1)
                props.refrestBooksInCart()
            }
        })
    }
    function getBookInCart() {
        return {
            book: bookData,
            amount: bookAmount,
            isSelected: isSelectedBook
        }
    }
    function updateBooksInCart() {
        let book = getBookInCart()
        BooksInShoppingCart.forEach(item => {
            if (item.book.id === book.book.id) {
                item.amount = book.amount
                item.isSelected = book.isSelected
            }
        })
        console.log(BooksInShoppingCart)
    }
    useEffect(() => {
        updateBooksInCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookAmount])
    useEffect(() => {
        updateBooksInCart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelectedBook])

    // useEffect(() => {
    //     dispatch(actions.updateBookInCart(getBookInCart()))
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [bookAmount])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // useEffect(()=>{
    //     dispatch(actions.updateBookInCart(getBookInCart()))
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isSelectedBook])


    return (
        <div className='book-in-cart-container'>
            <div style={bookInCartContainer} className='row'>
                <div className='col-sm-3'>
                    <input id={`cb-selecte-book-in-cart-${bookData.id}`} style={checkboxStyle} type='checkbox' defaultChecked={isSelectedBook} onChange={(e) => (onChangeCheckbox(e))}></input>
                    <div style={bookInCartImageStyle}></div>
                </div>
                <div style={priceContainerStyle} className='col-sm-4'>
                    <div className='book-in-cart-contents'>
                        <p className='book-in-cart-title'>{bookData.title}</p>
                        <p className='book-in-cart-author'>{bookData.author}</p>
                    </div>
                    <div className='book-in-cart-prices'>
                        <span className='book-in-cart-prv-price'>{bookData.prvPrice} đ</span>
                        <span className='book-in-cart-discount-rate'> -{bookData.discountrate}</span>
                        <span className='book-in-cart-cur-price'>{bookData.curPrice} đ</span>
                    </div>
                </div>
                <div className='col-sm-2 book-in-cart-amount-container'>
                    <div className='book-in-cart-amount'>
                        <button onClick={onDecreaseBookAmount} className='book-in-cart-amount-btn-minus'><img src={require('../../assets/icons/ic-minus-gray.png')} alt='ic-minus' /></button>
                        <input readOnly={true} value={bookAmount}></input>
                        <button onClick={onIncreaseBookAmount} className='book-in-cart-amount-btn-plus'><img src={require('../../assets/icons/ic-plus-gray-cart.png')} alt='ic-minus' /></button>
                    </div>
                </div>
                <div className='col-sm-3 book-in-cart-price-container'>
                    <span className='book-in-cart-price-cur-price'>{bookData.curPrice} đ</span>
                    <button onClick={() => (onRemoveBookInCart())} onMouseEnter={onHoverTrash} onMouseLeave={onNoneHoverTrash}><img src={require(`../../assets/icons/${isHoverTrash === true ? 'ic-trash.png' : 'ic-trash-gray.png'}`)} alt='ic-close' /></button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
