import * as request from '../utils/request';

export const getBooksInCart = async () => {
    try {
        const res = await request.get(`cart`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const addBookToCart = async(bookId)=>{
    try{
        const res = await request.post(`cart/${bookId}`)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const selectAllBook = async(isSelected) =>{
    try{
        const res = await request.put(`cart/selectall`, {selected: isSelected})
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const updateBookInCart = async(book)=>{
    try{
        const res = await request.put(`cart/${book.id}`, {selected: book.isSelected, quantity: book.quantity})
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const removeBookInCart = async(bookId)=>{
    try{
        const res = await request._delete(`cart/${bookId}`)
        return res.data
    }catch(err){
        console.log(err)
    }
}