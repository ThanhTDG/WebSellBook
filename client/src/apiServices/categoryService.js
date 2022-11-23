import * as request from '../utils/request';

export const categories = async (q) => {
    try {
        const res = await request.get('category');
        return res.data
    } catch (err) {
        console.log(err)
    }
}