import * as request from '../utils/request';

export const books = async (q) => {
    try {
        const res = await request.get('book', {
            params: {
                page: q,
                limit: 48
            }
        });
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const booksByCategoryId = async (q, page) => {
    console.log(q)
    try {
        const res = await request.get(`book`, {
            params: {
                category: q,
                page: page,
                limit: 48
            }
        });
        
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}