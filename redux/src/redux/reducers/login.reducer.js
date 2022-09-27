import { LOGIN_USER_ACCOUNT_ERROR, LOGIN_USER_ACCOUNT_SUCCESS, LOGIN_USER_ACCOUNT_REQUEST } from "../actions/type";

export default function (state = [], action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_USER_ACCOUNT_REQUEST:
			return {
				loading: true,
			};
		case LOGIN_USER_ACCOUNT_SUCCESS:
			return {
				...state,
				loading: false,
				payload: [payload],
			};
		case LOGIN_USER_ACCOUNT_ERROR:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}
