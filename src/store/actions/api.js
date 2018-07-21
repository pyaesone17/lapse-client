import { SET_API,SET_API_SUCCESS, CLEAR_ERROR } from '../constants'

export function setApi(data) {
    return {
        type : SET_API,
        data
    }
}

export function setApiToState(data) {
    return {
        type : SET_API_SUCCESS,
        data
    }
}

export function clearError() {
    return {
        type : CLEAR_ERROR
    }
}
