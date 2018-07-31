import * as Actions from './actions'
import {takeEvery} from 'redux-saga'

function* saveQuiz(action) {
    try {
        const user = yield call('', action.payload);
        yield put({ type: Actions.CREATE_QUIZ, user: user });
    } catch (e) {
        yield put({ type: Actions.CREATE_QUIZ, message: e.message });
    }
}

function* mySaga() {
    yield takeEvery(Actions.CREATE_QUIZ, saveQuiz);
    // yield put(Actions.)
}


export default mySaga;