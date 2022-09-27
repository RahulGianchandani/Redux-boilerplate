import {
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
  } from "./type";
  import axios from "axios";
import { ReadLocalStorage } from "../../utils/readLocalStorage";
import { BASEURL } from "../../constants/config"


  export const changePass = (currentPassword, newPassword) => async (dispatch) => {

    const token = ReadLocalStorage("token");
    // console.log(token)

    dispatch({ type: CHANGE_PASSWORD_REQUEST });
      // console.log("currentPass",currentPassword)
      // console.log("newPass",newPassword)
    try {
          const response = await axios({
              method: "POST",
              url: `${BASEURL}changePassword`,
              headers: {
                  Accept: "application/json",
                  'Authorization':  `Bearer ${token}`
              },
              data:{
                currentPassword: currentPassword,
                newPassword: newPassword,
            }
          });
        
  
        
          if(response.data)
          // console.log("Successfully changed password", response)
          return dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data });

      } catch (error) {
          // console.log(error);
          return dispatch({
              type: CHANGE_PASSWORD_ERROR,
              payload: error.response,
          });
      }
  };
  