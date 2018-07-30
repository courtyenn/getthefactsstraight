import * as Actions from './actions'

// function* fetchUser(action) {
//     try {
//         const user = yield call(Api.fetchUser, action.payload.userId);
//         yield put({ type: Actions.CREATE_QUIZ, user: user });
//     } catch (e) {
//         yield put({ type: "USER_FETCH_FAILED", message: e.message });
//     }
// }


function* mySaga() {
    yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}


export default mySaga;