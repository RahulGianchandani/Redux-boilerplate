import { LOGIN } from "../actions/type"
import axios from "axios";
import { BASEURL } from "../../constants/config";


// export const login = (data, success, offLoader) => async (dispatch) => {
//     Axios.post(`${config.base_url}/v1/admin/auth/login`, data)
//         .then((res) => {
//             localStorage.setItem('token', res.data.message.token)
//             konnect.defaults.headers.common['Authorization'] = "Bearer " + res.data.message.token;
//             dispatch({
//                 type: LOGIN,
//                 payload: res.data
//             })
//             success()
//             offLoader()
//         })
//         .catch(({ response }) => {
//             dispatch({
//                 type: LOGIN,
//                 payload: response.data
//             })
//             offLoader()
//         })
// }

export const setUser = (cb, loadingOff, showMessage, type) => async (dispatch) => {
    axios.interceptors.response.use((response) => {
        if (response.status === 200) {
            return response
        }
    }, (error) => {
        if (error.response && error.response.status === 401) {
            if((window.location.pathname !== ("/signup")) && (window.location.pathname !== ("/email")) &&  (window.location.pathname !== ("/login")) ) {
            showMessage()
            cb()
        }
        }
        return Promise.reject(error)
    })

    const token = localStorage.getItem('token')
    const url = type==="admin" ? `${BASEURL}admin/adminTokenValidate` : `${BASEURL}verify/token`
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        return axios.post(url)
            .then((res) => {
                dispatch({
                    type: LOGIN,
                    payload:{...res.data,message:{...res.data.Data,token}}
                })
                loadingOff()
            })
            .catch((err) => {
                loadingOff()
            })
    } else {
        loadingOff()
    }
}

export const logOut = () => async (dispatch) => {
    localStorage.removeItem('token')
    localStorage.removeItem('account_type')
    dispatch({
        type: LOGIN,
        payload: {}
    })
}
