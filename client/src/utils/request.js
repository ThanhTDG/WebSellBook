import axios from "axios";

const request = axios.create({
    baseURL:'https://api.toimuasach.click/api/v1/',
})

const postRequest = axios.create({
    baseURL:'https://api.toimuasach.click/api/v1/',
    method:'post'
})

const putRequest = axios.create({
    baseURL:'https://api.toimuasach.click/api/v1/',
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