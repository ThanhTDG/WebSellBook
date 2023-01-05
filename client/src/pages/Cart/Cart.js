import React, { useState, useEffect } from 'react';
import MyFooter from '../../components/Footer/MyFooter';
import Menu from '../../components/Menu/Menu';
import { BooksInShoppingCart, Discounts } from '../../components/ShoppingCart/BooksInShoppingCart';
import Discount from '../../components/ShoppingCart/Discount';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import { useStore, actions } from '../../store';
import * as CartServices from '../../apiServices/CartServices';
import './Cart.scss';
import LoadingShoppingCart from '../../components/ShoppingCart/LoadingShoppingCart';
import CheckoutButton from '../../components/ShoppingCart/CheckoutButton/CheckoutButton';

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

    async function onSelectedAllBook(e) {
        await updateApiBooksInCart(e.target.checked)
        // dispatch(actions.selectAllBookInCart(e.target.checked))
        // renderBooksInCart()
        // BooksInShoppingCart.forEach(item => {
        //     item.isSelected = e.target.checked
        //     let book = document.getElementById(`cb-selecte-book-in-cart-${item.book.id}`)
        //     book.checked = e.target.checked
        // })
    }

    const [isLoading, setIsLoading] = useState(true)
    const [apiBooksInCart, setApiBooksInCart] = useState([])
    const [apiTotalPricesBooksInCart, setApiTotalPricesBooksInCart] = useState(0)
    const [isSelectedAllBooks, setIsSelectedAllBooks] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchBooksInCart()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(()=>{
    //     setIsSelectedAllBooks(apiBooksInCart.isSelected)
    //     let ipSelectedAllBook = document.getElementById('cart-select-all-book')
    //     ipSelectedAllBook.checked = apiBooksInCart.isSelected
    // }, [apiBooksInCart])

    const fetchBooksInCart = async () => {
        const booksInCart = await CartServices.getBooksInCart()
        console.log('books in cart: ', booksInCart)
        setApiBooksInCart(booksInCart.items)
        setApiTotalPricesBooksInCart(booksInCart.total)
        setIsLoading(false)
        console.log(booksInCart)

        setIsSelectedAllBooks(booksInCart.isSelectedAll === null ? false : booksInCart.isSelectedAll)
        try {
            let ipSelectedAllBook = document.getElementById('cart-select-all-book')
            ipSelectedAllBook.checked = booksInCart.isSelectedAll
        } catch (ex) { }
    }

    const updateApiBooksInCart = async (isSelected) => {
        setIsLoading(true)
        const request = await CartServices.selectAllBook(isSelected)
        console.log('update all books in cart', request)
        setApiBooksInCart(request.items)
        setApiTotalPricesBooksInCart(request.total)
        setIsLoading(false)
    }

    const removeBookInCart = async (bookId) => {
        setIsLoading(true)
        const request = await CartServices.removeBookInCart(bookId)
        console.log('remove book in cart', request)
        fetchBooksInCart()
    }

    const refrestData = () => {
        setIsLoading(true)
        fetchBooksInCart()
    }

    const renderLoading = () => {
        let toRenders = []
        let max = apiBooksInCart.length <= 0 ? 1 : apiBooksInCart.length
        for (let i = 0; i < max; i++) {
            toRenders.push(<LoadingShoppingCart />)
        }
        return toRenders
    }

    function renderBooksInCart() {
        var context = isLoading ? renderLoading() :
            <div style={booksInCartContainerStyle} className='col-sm-8'>
                {apiBooksInCart.map((book) => (
                    <ShoppingCart bookData={book} refrestBooksInCart={reFreshBooksInCart} removeBookInCart={removeBookInCart} refrestData={refrestData} />
                ))}
            </div>
        return context
    }
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const [isActiveCheckout, setIsActiveCheckout] = useState(false)
    useEffect(() => {
        console.log('total', apiTotalPricesBooksInCart)
        setIsActiveCheckout(apiTotalPricesBooksInCart > 0 ? true : false)
    }, [apiTotalPricesBooksInCart])


    return (
        <div>
            <Menu active='Giỏ Hàng'></Menu>
            <div style={shoppingCartBodyStyle}>
                <div>Giỏ hàng ({apiBooksInCart.length} sản phẩm)</div>
                <div className='row'>
                    <div className='col-sm-8'>
                        <div style={shoppingCartToolbarStyle} className='row'>
                            <div style={toolbarCheckboxContainer} className='col-sm-7'>
                                <input id='cart-select-all-book' className='cart-responsive-checkbox' style={checkboxStyle} type='checkbox'
                                    defaultChecked={isSelectedAllBooks}
                                    onChange={(e) => (onSelectedAllBook(e))}></input>
                                <div className='cart-responsive-toolbar' style={toolbarSelectAllTextStyle}>Chọn tất cả ({apiBooksInCart.length} sản phẩm)</div>
                            </div>
                            <div className='col-sm-2 none-margin-padding amount-title'>
                                Số lượng
                            </div>
                            <div className='col-sm-3 none-margin-padding checkout-title'>
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
                                Discounts.map((item) => (
                                    <Discount discountData={item} />
                                ))
                            }
                        </div>
                        <div className='checkout-container'>
                            <div className='checkout-count'>
                                <div>
                                    <span className='checkount-count-text checkount-count-darker-text'>Tổng cộng</span>
                                    <span className='checkount-count-value'>{formatter.format(parseInt(apiTotalPricesBooksInCart))}</span>
                                </div>
                                <div className='sub-checkout-count-container'>
                                    <span className='checkount-count-text'>Giảm giá</span>
                                    <span className='checkount-count-value'><span className='checkout-count-value-percent'>(20%)</span> - <span className='checkout-count-value-value'>{formatter.format(parseInt((apiTotalPricesBooksInCart / 100) * 20))}</span></span>
                                </div>
                                <div className='sub-checkout-count-container sub-checkout-count-last-container'>
                                    <span className='checkount-count-text'>Thuế</span>
                                    <span className='checkount-count-value'><span className='checkout-count-value-percent'>(10%)</span> + <span className='checkout-count-value-value'>{formatter.format(parseInt((apiTotalPricesBooksInCart / 100) * 10))}</span></span>
                                </div>
                                <div>
                                    <span className='checkount-count-text checkount-count-darker-text'>Thành tiền</span>
                                    <span className='checkount-count-value'>{formatter.format(parseInt(apiTotalPricesBooksInCart - ((apiTotalPricesBooksInCart / 100) * 20) + ((apiTotalPricesBooksInCart / 100) * 10)))}</span>
                                </div>
                            </div>
                            <div className='checkount-buttons'>
                                {/* <button className='btn-checkout'>Thanh toán</button> */}
                                <CheckoutButton
                                    isActive={isActiveCheckout}
                                    refrestData={refrestData}
                                    discount={parseInt((apiTotalPricesBooksInCart / 100) * 20)}
                                    productPrices={parseInt(apiTotalPricesBooksInCart - ((apiTotalPricesBooksInCart / 100) * 20) + ((apiTotalPricesBooksInCart / 100) * 10))} />
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
