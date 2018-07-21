import {
    FETCH_LAPSE_SUCCESS,
    CLEAR_LAPSE_SUCCESS,
    DELETE_LAPSE_SUCCESS,
    FETCH_LAPSE_START_STATUS,
    FETCH_LAPSE_SUCCESS_STATUS,
    DELETE_LAPSE_START_STATUS,
    DELETE_LAPSE_SUCCESS_STATUS,
    DELETE_LAPSE_FAIL_STATUS
} from "../constants";

let initialState = {
    per_page: 15,
    data: [],
    deleted : [],
    current_page: 0,
    last_page: 0,
    total: 0
};

const lapses = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LAPSE_SUCCESS:
            return {
                ...state,
                ...action.data
            };
        case CLEAR_LAPSE_SUCCESS: {
            return initialState;
        }
        case DELETE_LAPSE_SUCCESS: {
            return {
                ...state,
                data : state.data.filter((d) => {
                    console.log(d.id, action.id)
                    return action.data.id != d.id
                }),
                deleted: state.deleted + [ action.data.id ]
            };
        }
        default:
            return state;
    }
};

export const lapsesStatus = (state = false, action) => {
    switch (action.type) {
        case FETCH_LAPSE_START_STATUS:
            return true;
        case FETCH_LAPSE_SUCCESS_STATUS:
            return false;
        case DELETE_LAPSE_FAIL_STATUS:
            return false;
        default:
            return state;
    }
};

export const deleteLapsesStatus = (state = false, action) => {
    switch (action.type) {
        case DELETE_LAPSE_START_STATUS:
            return true;
        case DELETE_LAPSE_SUCCESS_STATUS:
            return false;
        default:
            return state;
    }
};

export default lapses;
