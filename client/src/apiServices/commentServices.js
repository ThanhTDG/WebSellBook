import * as request from '../utils/request';

export const comments = async (q, page) => {
    try {
        const res = await request.get(`comment/${q}`, {
            params:{
                page: page,
                limit: 10
            }
        });
        return res.data
    } catch (err) {
        console.log(err)
    }
}