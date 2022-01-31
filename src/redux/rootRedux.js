import * as itunesRedux from './itunesRedux';
import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects'

//Combine all the sub reducers
export const rootReducer = combineReducers({
    itunes: itunesRedux.itunesReducer,
})

export const rootSage = function* rootSaga() {
    yield all([
        itunesRedux.saga()
    ])
}
