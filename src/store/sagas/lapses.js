import {
    FETCH_LAPSE,
    FETCH_LAPSE_SUCCESS,
    CLEAR_LAPSE,
    CLEAR_LAPSE_SUCCESS,
    DELETE_LAPSE,
    DELETE_LAPSE_SUCCESS,
    FETCH_LAPSE_START_STATUS,
    FETCH_LAPSE_SUCCESS_STATUS,
    DELETE_LAPSE_FAIL_STATUS,
    DELETE_LAPSE_START_STATUS,
    DELETE_LAPSE_SUCCESS_STATUS,
    ENDPOINT_ERROR
} from "../constants";
import { Alert } from 'react-native'

import { takeEvery, put, select } from "redux-saga/effects";

function* fetchLapseAsync() {
    yield put({ type: FETCH_LAPSE_START_STATUS });
    try {
        let api = yield select(state => state.api);
  
        let response = yield fetch(api.url + "/lapse", {
            method: "GET",
            headers: { 
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        
        let responseJson = yield response.json();

        yield put({ type: FETCH_LAPSE_SUCCESS, data: responseJson.data });
        yield put({ type: FETCH_LAPSE_SUCCESS_STATUS });
    } catch(err) {
        if(err.message=="Network request failed"){
            yield put({ type: ENDPOINT_ERROR });
        }
        yield put({ type: FETCH_LAPSE_SUCCESS_STATUS });
    }
}

function* clearLapseAsync() {
    yield put({ type: DELETE_LAPSE_START_STATUS });
    try {
        let api = yield select(state => state.api);
        let response = yield fetch(
            api.url + "/lapse/clear",
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.ok) {
            yield put({
                type: CLEAR_LAPSE_SUCCESS
            });
            yield put({ type: DELETE_LAPSE_SUCCESS_STATUS });
        } else {
            yield put({ type: DELETE_LAPSE_FAIL_STATUS });
        }
    } catch (err) {
        if(err.message=="Network request failed"){
            yield put({ type: ENDPOINT_ERROR });
        }
        yield put({ type: DELETE_LAPSE_FAIL_STATUS });
        console.log(err);
    }
}

function* deleteLapseAsync(action) {
    yield put({ type: DELETE_LAPSE_START_STATUS });
    try {
        let api = yield select(state => state.api);
        let response = yield fetch(
            api.url + "/lapse/" + action.data.id,
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.ok) {
            yield put({
                type: DELETE_LAPSE_SUCCESS,
                data: { id: action.data.id }
            });
            yield put({ type: DELETE_LAPSE_SUCCESS_STATUS });
        } else {
            yield put({ type: DELETE_LAPSE_FAIL_STATUS });
        }
    } catch (err) {
        if(err.message=="Network request failed"){
            yield put({ type: ENDPOINT_ERROR });
        }
        yield put({ type: DELETE_LAPSE_FAIL_STATUS });
        console.log(err);
    }
}

function* watchLapseAsync() {
    yield takeEvery(FETCH_LAPSE, fetchLapseAsync);
    yield takeEvery(DELETE_LAPSE, deleteLapseAsync);
    yield takeEvery(CLEAR_LAPSE, clearLapseAsync);
}

export default watchLapseAsync;
