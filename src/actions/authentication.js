import { SET_CURRENT_USER, LOGIN_ERROR } from "../actions/types";
import request from "../utils/request";
import config from "../config";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
export const logMeIn = userData => dispatch => {
  request(`${config.apiURL}/api/users`, "POST", userData)
    .then(res => {
      if (res.data.status === 200) {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      }
    })
    .catch(err => {
      if(err && err.response && err.response.data && err.response.data.errors) {
        dispatch({
          type: LOGIN_ERROR,
          payload: err.response.data.errors
        });
      } else {
        dispatch({
          type:LOGIN_ERROR,
          payload:{
            password:"Internal Server Error"
          }
        })
      }
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const logoutUser = decoded => {
  return {
    type:SET_CURRENT_USER,
    payload:{}
  }
}