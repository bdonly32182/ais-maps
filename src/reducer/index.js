import {combineReducers} from 'redux'
import Coordinate from './CoordinateReducer'
import Coperate from './CoperateReducer'
const rootReducer = combineReducers({
    coordinates:Coordinate,
    coperate:Coperate
})
export default rootReducer