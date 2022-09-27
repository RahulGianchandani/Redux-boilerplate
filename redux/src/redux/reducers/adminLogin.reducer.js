import {  ADMIN_LOGIN_ERROR,
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS, } from "../actions/type";

export default function (state = [], action) {
	const { type, payload } = action;
	switch (type) {
		case ADMIN_LOGIN_REQUEST:
			return {
				loading: true,
			};
		case ADMIN_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				payload: [payload],
			};
		case ADMIN_LOGIN_ERROR:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}
