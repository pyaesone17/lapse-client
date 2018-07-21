import { combineReducers } from "redux";
import lapses, { lapsesStatus, deleteLapsesStatus } from "./lapses";
import api from './api'

const reducer = combineReducers({
    api,
    lapses,
    lapsesStatus,
    deleteLapsesStatus
});

export default reducer;
