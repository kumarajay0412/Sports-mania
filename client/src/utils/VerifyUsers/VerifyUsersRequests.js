import axios from "axios";
import {baseUrl} from "../baseUrls" ;


export const getUnverifiedUsers = async (profile) => {
        return axios.post(`${baseUrl}/auth/unverified-users`,{
            profile,
        })
        .then((response) => {
            return {
                success: response.data.success,
                users:response.data.data
            };
        })
        .catch((error) => {
            return {
            error: error.message,
            };
        });
};

export const verifyRequest = async (rowData,category)=>{
    return axios.post(`${baseUrl}/auth/verify`,{
        ...rowData,
        profile:category
    })
    .then((response) => {
        return {
            success: response.data.success,
        };
    })
    .catch((error) => {
        return {
        error: error.message,
        };
    });
}