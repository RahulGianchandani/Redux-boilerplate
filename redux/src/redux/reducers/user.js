import {LOGIN} from "../actions/type";
export default function user(state={},action){
    switch(action.type){
        case LOGIN:
            return action.payload;
        default:
            return state
    }
}