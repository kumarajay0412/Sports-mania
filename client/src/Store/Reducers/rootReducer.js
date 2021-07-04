import {combineReducers} from "redux";
import authenticationReducer from "./authentication";
import updateUserReducer from "./updateUserDetails";
import alertsReducer from "./alerts";
const rootReducer = combineReducers({
    authentication:authenticationReducer,
    alerts:alertsReducer,
    updateUser:updateUserReducer
})
export default rootReducer;