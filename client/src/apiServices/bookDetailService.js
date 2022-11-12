import * as request from '../utils/request';

export const bookDetail = async (id) => {
    try {
        const res = await request.get(`book/${id}`);
        return res.data
    } catch (err) {
        console.log(err)
    }
}