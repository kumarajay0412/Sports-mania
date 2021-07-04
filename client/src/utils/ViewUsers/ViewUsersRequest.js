import axios from "axios";
import {baseUrl} from "../baseUrls" ;


export const getAllUsers = async () => {
        return axios.get(`${baseUrl}/auth/user`)
        .then((response) => {
            if (response.data.success) {
                return {
                    success: response.data.success,
                    users:response.data.data
                };
            }
        })
        .catch((error) => {
            return {
            error: error.message,
            };
        });
};