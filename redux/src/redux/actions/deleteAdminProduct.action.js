import { DELETEADMINPRODUCT } from "./type";
import { BASEURL } from '../../constants/config'
import axios from "axios";


export const deleteAdminProducts = (id) => (dispatch) => {

    return axios({
        method: "POST",
        url: `${BASEURL}admin/product/delete`,
        headers: {
            Accept: "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        data:{
            _id:id
        }
    })
        .then((response) => {
            dispatch({
                type: DELETEADMINPRODUCT,
                payload: response.data,
            });
            return response.data
        })

        .catch((error) => {
            // console.log("error", error);
        });
};