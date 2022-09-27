import { DELETE_STORE_BY_ID_SUCCESS, DELETE_STORE_BY_ID_ERROR, DELETE_STORE_BY_ID_REQUEST } from "./type";
import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "../../constants/config"

export const deleteStoreById = (body) => (dispatch) => {
	dispatch({ type: DELETE_STORE_BY_ID_REQUEST });
	return axios({
		method: "POST",
		url: `${BASEURL}users/deleteStorebyId`,
		headers: {
			Accept: "application/json",
		},
		data: body,
	})
		.then((response) => {
			toast.success("Store Updated!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return dispatch({ type: DELETE_STORE_BY_ID_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			// console.log("error");
			return dispatch({
				type: DELETE_STORE_BY_ID_ERROR,
				payload: error.response,
			});
		});
};
