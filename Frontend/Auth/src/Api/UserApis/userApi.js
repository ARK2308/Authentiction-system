import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";

export const registerApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header,"user");
}

// user loginApi api
export const loginApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/login`,data,header,"user");
}
