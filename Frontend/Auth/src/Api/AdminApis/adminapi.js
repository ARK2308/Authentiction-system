import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";


// admin register api
export const AdminregisterApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/register`,data,header,"admin");
}

// admin Login Api
export const AdminLoginApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/login`,data,header,"admin");
}


// admin AdminLogout Api
export const AdminLogoutApi = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/logout`,"",header,"admin");
}
