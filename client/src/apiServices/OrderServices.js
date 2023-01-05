import * as request from "../utils/request";

export const getAll =async (page, limit, status)=>{
    try{
        const rq = await request.get(`order`, 
        {
            params: {status: status}
        })
        return rq.data
    }catch(err){
        console.log(err)
    }
}