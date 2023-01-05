import * as request from '../utils/request';

export const getFavoriteBooks = async ()=>{
    try {
        const res = await request.get(`favorite`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const addFavoriteBook = async (bookId)=>{
    try {
        const res = await request.post(`favorite/${bookId}`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const removeFavoriteBook = async (bookId)=>{
    try {
        const res = await request._delete(`favorite/${bookId}`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}