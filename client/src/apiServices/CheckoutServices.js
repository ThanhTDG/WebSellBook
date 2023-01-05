import * as request from "../utils/request";

export const checkout =async (checkoutInfo)=>{
    try{
        const rq = await request.post(`cart/checkout`, {
            ...checkoutInfo
        })
        return rq.data
    }catch(err){
        console.log(err)
    }
}