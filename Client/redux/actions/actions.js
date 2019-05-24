import {

  UPDATE_DISPLAY
} from "../constants/actionTypes";
const api = process.env.API_HOST;



export function UpdateDisplay(data) {
  return function(dispatch) {
    dispatch({ type: UPDATE_DISPLAY, payload: data });
  };
}

