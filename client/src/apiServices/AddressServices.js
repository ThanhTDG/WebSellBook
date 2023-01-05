import * as request from "../utils/request";

export const getAll =async (page, limit)=>{
    try{
        const rq = await request.get(`address`, {
            page: page,
            limit: limit
        })
        return rq.data
    }catch(err){
        console.log(err)
    }
}

export const add = async (address)=>{
    try{
        const rq = await request.post(`address`, (address))
        return rq.data
    }catch(err){
        console.log(err)
    }
}

export const getAddress = async (addressId)=>{
    try{
        const rq = await request.post(`address/${addressId}`)
        return rq.data
    }catch(err){
        console.log(err)
    }
}

export const updateAddress = async (addressId, address)=>{
    try{
        const rq = await request.put(`address/${addressId}`, address)
        return rq.data
    }catch(err){
        console.log(err)
    }
}

export const removeAddress = async (addressId)=>{
    try{
        const rq = await request._delete(`address/${addressId}`)
        return rq.data
    }catch(err){
        console.log(err)
    }
}