import {COORDINATE,COOROFCOP} from './action/Type'
export default function (state=[],action) {
    switch (action.type) {
        case COORDINATE:
            return action.payload 
        case COOROFCOP:
            return action.payload
        default:
            return state;
    }
}