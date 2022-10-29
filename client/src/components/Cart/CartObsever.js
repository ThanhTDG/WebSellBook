import { FakeData } from "../../variables/FakeData";

export var BooksInCart = [
    {
        id: FakeData.books[0].id,
        book: FakeData.books[0],
        amount: 1,
        discount: 20,
        checked: false
    },
    {
        id: FakeData.books[2].id,
        book: FakeData.books[2],
        amount: 1,
        discount: 15,
        checked: false
    },
]