import axios from "axios";

const request = axios.create({
    baseURL:'https://toi-mua-sach.herokuapp.com/api/',
    method:'get'
})

const postRequest = axios.create({
    baseURL:'https://toi-mua-sach.herokuapp.com/api/',
    method:'post'
})

const putRequest = axios.create({
    baseURL:'https://toi-mua-sach.herokuapp.com/api/',
    method:'put'
})

export const get = async(path, options={})=>{
    const response = await request.get(path, options)
    return response
}

export const post = async(path, options={})=>{
    const response = await postRequest.post(path, options)
    return response
}

export const put = async(path, options={})=>{
    const response = await putRequest.put(path, options)
    return response
}

export default request