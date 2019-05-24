import {UPDATE_DISPLAY} from "../constants/actionTypes";

const initialState = {
  visible:0
};

function rootReducer(state = initialState, action) {
  if (action.type === UPDATE_DISPLAY) {
    return Object.assign({}, state, {
      visible:action.payload
    });
  }
  
  return state;
}

export default rootReducer;
