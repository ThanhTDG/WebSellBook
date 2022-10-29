import React from 'react';
import { MyVariable } from '../../variables/variables';
import './BookCart.scss';
import { BooksInCart } from './CartObsever';
import discountImage from '../../assets/icons/discount.png'
export default class BookCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    render() {
        function bookInCartImageStyle(image) {
            return {
                width: '100%',
                height: '124px',
                background: `url('${image}') center center`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '150% 112%',
                borderRadius: '8px',
                border: '2px solid white',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
            }
        }
        const btnDiscountStyle = {
            position: 'relative',
            border: 'none',
            'background-color': 'var(--LightGray)'
        }
        const btnRemoveBookInCartStyle = {
            background: `url('${MyVariable.hostName}/assets/icons/ic-remove.png') center center`,
            backgroundSize: '60% 60%',
            backgroundRepeat: 'no-repeat'
        }

        function onIncreaceAmount(id) {
            BooksInCart.forEach((item) => {
                if (item.id === id) {
                    item.amount = item.amount + 1
                    var ip = document.getElementById(`book-in-cart-amount-input-${id}`)
                    ip.value = item.amount
                    return
                }
            })
        }
        function onDecreaceAmount(id) {
            BooksInCart.forEach((item) => {
                if (item.id === id) {
                    item.amount = item.amount - 1
                    var ip = document.getElementById(`book-in-cart-amount-input-${id}`)
                    ip.value = item.amount
                    return
                }
            })
        }
        function renderAmountInputID(bookID) {
            return `book-in-cart-amount-input-${bookID}`
        }
        function removeBookInCart(id) {
            BooksInCart.forEach((item) => {
                if (item.id === id) {
                    var i = BooksInCart.indexOf(item)
                    BooksInCart.splice(i, 1)
                    return
                }
            })
        }
        function getTotal(bookInCart) {
            return (parseInt(bookInCart.amount, 0) * (parseInt(bookInCart.book.curPrice) - (parseInt(bookInCart.book.curPrice) * parseInt(bookInCart.discount) / 100)))
        }
        function onChangeSelectAll(e) {
            BooksInCart.forEach((item) => {
                item.checked = e.target.checked
                let clone = document.getElementById(`cb-book-in-cart-${item.id}`)
                clone.checked = item.checked
            })
        }
        function renderCheckBoxId(id) {
            return `cb-book-in-cart-${id}`
        }
        return (
            <div id='book-cart-container'>
                <div id='book-cart-title'><p>{MyVariable.YourCart.title}</p><span>có {BooksInCart.length} sản phẩm</span></div>
                <div id='book-cart-tool-bar' className='row'>
                    <div className='col-sm-1 tb-cb'>
                        <input id='tb-check-box' type='checkbox' onChange={(e) => {
                            onChangeSelectAll(e)
                            this.setState({ count: this.state.count + 1 })
                        }}></input>
                    </div>
                    <div className='col-sm-6 tb-title'>
                        <p>Chọn tất cả {BooksInCart.length} sản phẩm</p>
                    </div>
                    <div className='col-sm-2 to-hide'>
                        <p>Số lượng</p>
                    </div>
                    <div className='col-sm-3 to-hide'>
                        <p>Thành tiền</p>
                    </div>
                </div>
                {BooksInCart.map((item) => (
                    <div className='row book-cart-book' key={item.id}>
                        <div className='col-sm-1 book-in-cart-check-box-container'>
                            <input id={renderCheckBoxId(item.id)} className='tb-book-check-box' type='checkbox' defaultChecked={item.checked}></input>
                        </div>
                        <div className='col-sm-6 book-in-cart-content-image-container'>
                            <div className='row'>
                                <div className='col-sm-2  book-in-cart-image-container'>
                                    <div className='book-in-cart-image' style={bookInCartImageStyle(item.book.image)}></div>
                                </div>
                                <div className='col-sm-10 book-in-cart-content'>
                                    <span>{item.book.title}</span>
                                    <span>{item.book.author}</span>
                                    {/* <div className='row book-in-cart-discount'>{item.book.discountcodes.map((code) => (
                                    <div className='col-sm-4'>
                                        <button style={btnDiscountStyle}>
                                            <img className='discount-image' src={discountImage} alt='discount' />
                                            <div className='discount-content'>giảm {code}</div></button>
                                    </div>
                                ))}</div> */}
                                    <div className='book-in-cart-price-container'>
                                        <span><span className='book-in-cart-before-price'>{item.book.prvPrice.toLocaleString()} đ</span><span className='book-in-cart-discount'>-{item.discount}%</span></span>
                                        <span>{item.book.curPrice.toLocaleString()} đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-2 book-in-cart-amount'>
                            <button
                                onClick={(e) => {
                                    onDecreaceAmount(item.id)
                                    this.setState({ count: this.state.count + 1 })
                                }}><img src={require('../../assets/icons/ic-minus-black.png')} alt='ic-de' /></button>
                            <input id={renderAmountInputID(item.id)} type='text' readOnly={true} value={item.amount} />
                            <button
                                onClick={(e) => {
                                    onIncreaceAmount(item.id)
                                    this.setState({ count: this.state.count + 1 })
                                }}><img src={require('../../assets/icons/ic-plus-black.png')} alt='ic-de' /></button>
                        </div>
                        <div className='col-sm-3 book-in-cart-prices'>
                            <span>{(getTotal(item)).toLocaleString()} đ</span>
                            <button className='btn-remove-book-in-cart' style={btnRemoveBookInCartStyle}
                                onClick={() => {
                                    removeBookInCart(item.id)
                                    this.setState({ count: this.state.count + 1 })
                                }} ></button>
                        </div>
                    </div>
                ))}
                <div className='row book-in-cark-purchase-container'>
                    <div className='col-sm-7'>

                    </div>
                    <div className='col-sm-5 book-in-cark-purchase-btn'>
                        <div className='row'>
                            <div className='col-sm-6 left-align-collumn'>
                                Thành tiền
                            </div>
                            <div className='col-sm-6 right-align-collumn'>
                                {this.state.count}
                            </div>
                        </div>
                        <button id='btn-cart-purchase'>Thanh toán</button>
                    </div>
                </div>
            </div>
        )
    }
}