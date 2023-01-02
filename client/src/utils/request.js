import axios from "axios";

const request = axios.create({
    baseURL:'https://api.toimuasach.click/api/v1/',
    withCredentials: true,
})

const postRequest = axios.create({
    baseURL:'https://api.toimuasach.click/api/v1/',
    method:'post',
    withCredentials: true,
})

const putRequest = axios.create({
    baseURL:'https://api.toimuasach.click/api/v1/',
    method:'put',
    withCredentials: true,
})

const deleteRequest = axios.create({
    baseURL:'https://api.toimuasach.click/api/v1/',
    method:'put',
    withCredentials: true,
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

export const _delete = async(path, options={})=>{
    const response = await deleteRequest.delete(path, options)
    return response
}

export default request