import {CORPERATE} from './action/Type'
export default function (state=[],action) {

    switch (action.type) {
        case CORPERATE:
            
            return action.payload
    
        default:
            return state;
    }
}