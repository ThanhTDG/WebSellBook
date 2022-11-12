import axios from "axios";

const request = axios.create({
    baseURL:'https://toi-mua-sach.herokuapp.com/api/',
    method:'get'
})

export const get = async(path, options={})=>{
    const response = await request.get(path, options)
    return response
}

export default request