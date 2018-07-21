import { SET_API_SUCCESS, ENDPOINT_ERROR, CLEAR_ERROR } from "../constants";

let initialState = {
    url: "",
    secret: "",
    error: false
};

const api = (state = initialState, action) => {
    switch (action.type) {
        case SET_API_SUCCESS:
            return {
                url: action.data.url,
                secret: action.data.secret
            };
        case ENDPOINT_ERROR:
            return {
                error: true
            };
        case CLEAR_ERROR:
            return {
                error: false
            };
        default:
            return state;
    }
};

export default api;
