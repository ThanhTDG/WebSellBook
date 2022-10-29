import React, { useState } from 'react';
import MyFooter from '../../components/Footer/MyFooter';
import Menu from '../../components/Menu/Menu';
import { BooksInShoppingCart, Discounts } from '../../components/ShoppingCart/BooksInShoppingCart';
import Discount from '../../components/ShoppingCart/Discount';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import { useStore, actions } from '../../store';
import './Cart.scss'

const Cart = () => {
    //const [state, dispatch] = useStore()
    //var { booksInCart } = state
    const [isReFrest, setIsReFresh] = useState(false)
    function reFreshBooksInCart() {
        setIsReFresh(!isReFrest)
    }
    const shoppingCartBodyStyle = {
        backgroundColor: 'var(--White)',
        fontFamily: 'MontserratRegular',
        margin: '24px 36px 0px 36px',
        fontSize: '24px'
    }
    const shoppingCartToolbarStyle = {
        backgroundColor: 'var(--LightGray)',
        borderRadius: '12px',
        fontSize: '16px',
        accentColor: 'var(--Blue)',
        margin: '24px 0px',
        padding: '12px'
    }
    const checkboxStyle = {
        width: '24px',
        height: '24px',
        position: 'absolute',
        top: '0',
        left: '12px'
    }
    const toolbarCheckboxContainer = {
        margin: '0',
        padding: '0',
        position: 'relative',
    }
    const toolbarSelectAllTextStyle = {
        display: 'inline-block',
        paddingLeft: '72px',
    }
    const discountContainerStyle = {
        margin: '24px 0px 0px 0px',
        padding: '0px',
        paddingTop: '4px'
    }
    const booksInCartContainerStyle = {

    }

    function onSelectedAllBook(e) {
        // dispatch(actions.selectAllBookInCart(e.target.checked))
        // renderBooksInCart()
        BooksInShoppingCart.forEach(item => {
            item.isSelected = e.target.checked
            let book = document.getElementById(`cb-selecte-book-in-cart-${item.book.id}`)
            book.checked = e.target.checked
        })
    }
    function renderBooksInCart() {
        var context = <div style={booksInCartContainerStyle} className='col-sm-8'>
            {BooksInShoppingCart.map((book) => (
                <ShoppingCart bookData={book} refrestBooksInCart={reFreshBooksInCart} />
            ))}
        </div>
        return context
    }
    function getTotalToCheckOut() {
        let total = 0
        BooksInShoppingCart.forEach(item => {
            total += item.amount * item.book.curPrice
        })
        return total
    }
    return (
        <div>
            <Menu active='Giỏ Hàng'></Menu>
            <div style={shoppingCartBodyStyle}>
                <div>Giỏ hàng ({BooksInShoppingCart.length} sản phẩm)</div>
                <div className='row'>
                    <div className='col-sm-8'>
                        <div style={shoppingCartToolbarStyle} className='row'>
                            <div style={toolbarCheckboxContainer} className='col-sm-7'>
                                <input style={checkboxStyle} type='checkbox' onChange={(e) => (onSelectedAllBook(e))}></input>
                                <div style={toolbarSelectAllTextStyle}>Chọn tất cả ({BooksInShoppingCart.length} sản phẩm)</div>
                            </div>
                            <div className='col-sm-2 none-margin-padding'>
                                Số lượng
                            </div>
                            <div className='col-sm-3 none-margin-padding'>
                                Thành tiền
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-4 discounts-title-container'>
                        <span id='discounts-title'>Phiếu giảm giá</span>
                    </div>
                </div>
                <div className='row'>
                    {renderBooksInCart()}
                    <div className='col-sm-4 '>
                        <div className='discounts-container'>
                            {
                                Discounts.map((item)=>(
                                    <Discount discountData={item} />
                                ))
                            }
                        </div>
                        <div className='checkout-container'>
                            <div className='checkout-count'>
                                <div>
                                    <span className='checkount-count-text checkount-count-darker-text'>Tổng cộng</span>
                                    <span className='checkount-count-value'>{getTotalToCheckOut()} đ</span>
                                </div>
                                <div className='sub-checkout-count-container'>
                                    <span className='checkount-count-text'>Giảm giá</span>
                                    <span className='checkount-count-value'><span className='checkout-count-value-percent'>(20%)</span> - <span className='checkout-count-value-value'>{((getTotalToCheckOut()/100)*20)} đ</span></span>
                                </div>
                                <div className='sub-checkout-count-container sub-checkout-count-last-container'>
                                    <span className='checkount-count-text'>Thuế</span>
                                    <span className='checkount-count-value'><span className='checkout-count-value-percent'>(10%)</span> + <span className='checkout-count-value-value'>{((getTotalToCheckOut()/100)*10)} đ</span></span>
                                </div>
                                <div>
                                    <span className='checkount-count-text checkount-count-darker-text'>Thành tiền</span>
                                    <span className='checkount-count-value'>{getTotalToCheckOut()} đ</span>
                                </div>
                            </div>
                            <div className='checkount-buttons'>
                                <button className='btn-checkout'>Thanh toán</button>
                                <button className='btn-cont-shopping'>Tiếp tục mua sách</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MyFooter />
        </div>
    );
}

export default Cart;
