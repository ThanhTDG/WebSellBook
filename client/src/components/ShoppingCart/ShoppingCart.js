import React, { useState, useEffect, setState } from 'react';
import './ShoppingCart.scss'
import { useStore, actions } from '../../store';
import { BooksInShoppingCart } from './BooksInShoppingCart';
import * as CartServices from '../../apiServices/CartServices'

const ShoppingCart = (props) => {
    const [isHoverTrash, setIsHoverTrash] = useState(false)

    const [bookData, setBookData] = useState(props.bookData.book)
    const [bookAmount, setbookAmount] = useState(props.bookData.quantity)
    const [isSelectedBook, setIsSelectedBook] = useState(props.bookData.selected)
    const [bookTotal, setBookTotal] = useState(props.bookData.total)

    const [isLoading, setIsLoading] = useState(false)

    const [state, dispatch] = useStore()
    // const { booksInCart } = state
    // const bookDataState = booksInCart.find(item=> item.book.id === bookData.id)

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    function onHoverTrash() {
        setIsHoverTrash(true)
    }
    function onNoneHoverTrash() {
        setIsHoverTrash(false)
    }
    const bookInCartImageStyle = {
        backgroundImage: `url('${bookData.images[0]}')`,
        backgroundPosition:'center',
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

    async function onDecreaseBookAmount() {
        let temp = bookAmount === 1 ? 1 : bookAmount - 1
        setbookAmount(temp)
        console.log('book amount de' , temp)
        await updateBookInCart(getBook(bookData._id, isSelectedBook, temp))
        props.refrestData()
    }
    async function onIncreaseBookAmount() {
        let temp = bookAmount + 1
        setbookAmount(temp)
        console.log('book amount in', temp)
        await updateBookInCart(getBook(bookData._id, isSelectedBook, temp))
        props.refrestData()
    }
    async function onChangeCheckbox(e) {
        setIsSelectedBook(e.target.checked)
        let checked = e.target.checked
        console.log('checked', checked)
        await updateBookInCart(getBook(bookData._id, checked, bookAmount))
        props.refrestData()
    }

    // useEffect(()=>{
    //     updateBookInCart(getBook(bookData._id, isSelectedBook, bookAmount))
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [bookAmount])

    const getBook = (id, isSelected, quantity)=>{
        return{
            id: id,
            isSelected: isSelected,
            quantity: quantity
        }
    }

    const updateBookInCart = async (book) =>{
        console.log('get book', book)
        setIsLoading(true)
        const request = await CartServices.updateBookInCart(book)
        console.log('update book in cart', request)
        //setBookData(request.book)
    }


    return (
        <div className='book-in-cart-container'>
            <div style={bookInCartContainer} className='row responsive-row'>
                <div className='col-sm-3 responsive-col-1'>
                    <input className='responsive-checkbox' id={`cb-selecte-book-in-cart-${bookData._id}`} style={checkboxStyle} type='checkbox' defaultChecked={isSelectedBook} onChange={(e) => (onChangeCheckbox(e))}></input>
                    <div style={bookInCartImageStyle} className='responsice-book-image-in-cart'></div>
                </div>
                <div style={priceContainerStyle} className='col-sm-4 responsive-col-2'>
                    <div className='book-in-cart-contents'>
                        <p className='book-in-cart-title'>{bookData.name}</p>
                        {/* <p className='book-in-cart-author'>{bookData.author}</p> */}
                    </div>
                    <div className='book-in-cart-prices'>
                        <span className='book-in-cart-prv-price'>{formatter.format(parseInt(bookData.originalPrice))}</span>
                        <span className='book-in-cart-discount-rate'> -{bookData.discountRate}%</span>
                        <span className='book-in-cart-cur-price'>{formatter.format(parseInt(bookData.price))}</span>
                    </div>
                </div>
                <div className='col-sm-2 book-in-cart-amount-container responsive-col-3'>
                    <div className='book-in-cart-amount'>
                        <button onClick={onDecreaseBookAmount} className='book-in-cart-amount-btn-minus'><img src={require('../../assets/icons/ic-minus-gray.png')} alt='ic-minus' /></button>
                        <input readOnly={true} value={bookAmount}></input>
                        <button onClick={onIncreaseBookAmount} className='book-in-cart-amount-btn-plus'><img src={require('../../assets/icons/ic-plus-gray-cart.png')} alt='ic-minus' /></button>
                    </div>
                </div>
                <div className='col-sm-3 book-in-cart-price-container responsive-col-4'>
                    <span className='book-in-cart-price-cur-price'>{formatter.format(parseInt(bookTotal))}</span>
                    <button className='responsive-remove-btn' onClick={() => (props.removeBookInCart(bookData._id))} onMouseEnter={onHoverTrash} onMouseLeave={onNoneHoverTrash}><img src={require(`../../assets/icons/${isHoverTrash === true ? 'ic-trash.png' : 'ic-trash-gray.png'}`)} alt='ic-close' /></button>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
