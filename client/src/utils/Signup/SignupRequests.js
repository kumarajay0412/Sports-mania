import axios from "axios";
import {baseUrl} from "../baseUrls" ;

export const postNewUser = async (
    uid,firstName,lastName,profile,uniqueIdentifier,status
) => {
        return axios.post(`${baseUrl}/auth/user`, {
            uid,
            firstName,
            lastName,
            profile,
            uniqueIdentifier,
            status
        })
        .then((response) => {
            if (response.data.success) {
            return {
                success: response.data.success,
            };
            }
        })
        .catch((error) => {
            return {
            error: error.message,
            };
        });
};