import * as request from '../utils/request';

export const books = async (q) => {
    try {
        const res = await request.get('book', {
            params: {
                page: 1,
                limit: 20
            }
        });
        return res.data
    } catch (err) {
        console.log(err)
    }
}