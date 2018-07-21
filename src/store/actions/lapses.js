import { FETCH_LAPSE, DELETE_LAPSE, CLEAR_LAPSE } from '../constants'

export function fetchLapse() {
    return {
        type : FETCH_LAPSE
    }
}

export function deleteLapse(data) {
    return {
        type : DELETE_LAPSE,
        data
    }
}

export function clearLapse() {
    return {
        type : CLEAR_LAPSE
    }
}