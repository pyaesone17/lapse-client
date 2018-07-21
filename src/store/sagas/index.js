import { all } from "redux-saga/effects";
import watchLapseAsync from './lapses';
import watchApiAsync from './api'

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield all([
        watchLapseAsync(),
        watchApiAsync()
    ]);
}
