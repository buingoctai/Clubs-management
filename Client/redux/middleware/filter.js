import { POST_LIST_TEAM } from "../constants/actionTypes";


export function reValidation({ dispatch }) {
    return function(next){
      return function(action){
        // do your stuff
        if(action.type === POST_LIST_TEAM){
            if(action.payload.length>64){
                return dispatch({type: "BAD_DATA"})
            }
        }
        return next(action);
      }
    }
  }