import axios from "axios";
import { put, fork, call, takeEvery, all } from "redux-saga/effects";
import { LOGIN_SUCESS, LOGIN_FAILURE, LOGIN_REQUEST } from "../types";

const loginUserAPI = (loginData) => {
  console.log(loginData, "loginData");
  const config = {
    headers: {
      "Contetn-Type": "application/json",
    },
  };
  return axios.post("api/auth", loginData, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    console.log(result);
    yield put({ 
      type: LOGIN_SUCESS,
      payload: result.data
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      payload: e.response
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser)
  ]);
}
