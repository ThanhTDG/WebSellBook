import * as request from '../utils/request';

export const signIn = async (userName, passWord) => {
    try {
        const res = await request.post(`auth/signin`, ({
            username: userName,
            password: passWord
        }));
        console.log(res.data)
        return res.data
    } catch (err) {
        console.log(err)
    }
}