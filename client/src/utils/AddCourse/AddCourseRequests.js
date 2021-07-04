import axios from "axios";
import {baseUrl} from "../baseUrls" ;

export const postNewCourse = async (
    course_name,start_date,end_date,credit
) => {
        return axios.post(`${baseUrl}/course`, {
            course_name,
            start_date,
            end_date,
            credit
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