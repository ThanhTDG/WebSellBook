import * as request from '../utils/request';

export const comments = async (q) => {
    try {
        const res = await request.get(`comment/${q}`, {
            params:{
                page: 1,
                limit: 5
            }
        });
        return res.data
    } catch (err) {
        console.log(err)
    }
}