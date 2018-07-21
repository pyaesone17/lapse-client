import { AsyncStorage } from 'react-native'
import { takeEvery, put } from "redux-saga/effects";

function* setApiUrlAsync(action) {
    yield AsyncStorage.setItem("url",action.data.url)
    yield put({ type: "SET_API_URL_SUCCESS", data: {url : data.url }})
}

function* setApiKeyAsync(action) {
    yield AsyncStorage.setItem("url",action.data.secret)
    yield put({ type: "SET_API_KEY_SUCCESS", data: {secret : data.secret }})
}

function* setApiAsync(action) {
    yield AsyncStorage.setItem("url",action.data.url)
    yield AsyncStorage.setItem("secret",action.data.secret)
    yield put({ type: "SET_API_SUCCESS", data: {secret : action.data.secret , url : action.data.url }})
}

function* watchApiAsync() {
    yield takeEvery("SET_API_URL", setApiUrlAsync);
    yield takeEvery("SET_API_KEY", setApiKeyAsync);
    yield takeEvery("SET_API", setApiAsync);
}

export default watchApiAsync;