import React, { useEffect, useState } from 'react';
import './AddToCartButton.scss'
import { useStore, actions } from '../../store'
import { BooksInShoppingCart } from '../ShoppingCart/BooksInShoppingCart';

const AddToCardButton = (props) => {
    const [state, dispatch] = useStore()
    const [isAddBook, setIsAddBook] = useState(false)
    const buttonStyle = {
        fontFamily: "Montserrat",
        fontSize: '16px',
        color: 'var(--White)',
        height: '48px',
        width: '200px',
        border: 'none',
        borderRadius: '24px',
        backgroundColor: 'var(--DarkBlue)',
        transitionDuration: '0.4s'
    }
    // function addToCart(book,e){
    //     e.preventDefault();
    //     dispatch(actions.addBookToCart({book: book, amount: 1, isSelected: false}))
    // }
    function onClickAddBookToCart() {
        var isHaveBook = false
        BooksInShoppingCart.forEach(element => {
            if (element.book.id === props.bookData.id) {
                element.amount += 1
                isHaveBook = true
            }
        });
        if (isHaveBook === false) {
            BooksInShoppingCart.push({
                book: props.bookData,
                amount: 1,
                isSelected: false
            })
            dispatch(actions.addBookToCart({
                book: props.bookData,
                amount: 1,
                isSelected: false
            }))
        }
        // setIsAddBook(true)
        // if (isAddBook === true) {
        //     dispatch(actions.addBookToCart({ book: props.bookData, amount: 1, isSelected: false }))
        // }
        //dispatch(actions.addBookToCart({ book: props.bookData, amount: 1, isSelected: false }))
    }
    // useEffect(()=>{
    //     dispatch(actions.addBookToCart({book: props.bookData, amount: 1, isSelected: false}))
    // }, [dispatch, isAddBook, props.bookData])
    return (
        <div>
            <button className='btn-add-book-to-cart' onClick={onClickAddBookToCart} style={buttonStyle}>Thêm vào giỏ hàng</button>
        </div>
    );
}

export default AddToCardButton;
