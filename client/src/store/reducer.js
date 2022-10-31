import { ADD_BOOK_TO_CART, REMOVE_BOOK_IN_CART, SELECT_ALL_BOOK_IN_CART, UPDATE_BOOK_IN_CART } from "./constants"
import { FakeData } from "../variables/FakeData"
import { BooksInShoppingCart } from "../components/ShoppingCart/BooksInShoppingCart"

const initState = {
    booksInCartAmount: BooksInShoppingCart.length,
    booksInCart: [
        {
            book: FakeData.books[0],
            amount: 3,
            isSelected: false
        },
        {
            book: FakeData.books[1],
            amount: 1,
            isSelected: false
        },
        {
            book: FakeData.books[2],
            amount: 1,
            isSelected: false
        }
    ],
}
function reducer(state, action) {
    switch (action.type) {
        case ADD_BOOK_TO_CART:
            return {
                ...state,
                booksInCart: [...state.booksInCart, action.payload],
                booksInCartAmount: BooksInShoppingCart.length
            }
        case SELECT_ALL_BOOK_IN_CART:
            return {
                ...state,
                booksInCart: selectAllBookInCart(state.booksInCart, action.payload)
            }
        case UPDATE_BOOK_IN_CART:
            return {
                ...state,
                booksInCart: updateBookInCart(state.booksInCart, action.payload)
            }
        case REMOVE_BOOK_IN_CART:
            return {
                ...state,
                // booksInCart: removeBookInCart(state.booksInCart, action.payload)
                booksInCartAmount: BooksInShoppingCart.length
            }
        default:
            throw new Error('Invalid actions')
    }
}
function addBookToCart(books, book) {
    var hasAdd = [...books, book]
    // hasAdd.forEach(item => {
    //     if (item.book.id === book.book.id) {
    //         let lIndex = hasAdd.lastIndexOf(item)
    //         console.log(item)
    //         console.log(lIndex)
    //         // item.amount += hasAdd[lIndex].amount
    //         // hasAdd.splice(lIndex, 1)
    //     }
    // });
    return hasAdd
}

function updateBookInCart(books, book) {
    books.forEach(item => {
        if (item.book.id === book.book.id) {
            item.amount = book.amount
            item.isSelected = book.isSelected
        }
    });
    return books
}
function removeBookInCart(books, book) {
    books.forEach(item => {
        if (item.book.id === book.book.id) {
            let index = books.indexOf(item)
            books.splice(index, 1)
        }
    });
    return books
}
function selectAllBookInCart(books, isSelected) {
    books.forEach((item) => {
        item.isSelected = isSelected
        let book = document.getElementById(`cb-selecte-book-in-cart-${item.book.id}`)
        book.checked = isSelected
    })
    return books
}

export { initState }
export default reducer