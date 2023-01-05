import * as request from "../utils/request";

export const getAll =async (page, limit, status)=>{
    try{
        const rq = await request.get(`order`, 
        {
            params: {page:1, limit:48, status: status}
        })
        return rq.data
    }catch(err){
        console.log(err)
    }
}