import { call, put, select } from 'redux-saga/effects';

import LoginActions from './login.reducer';
import AccountActions from '../../shared/reducers/account.reducer';
import WebsocketService from '../../shared/websockets/websocket.service';

export const selectAuthToken = (state) => state.login.authToken;

// export function* generateOTP(api, action) {
//   const { options } = action;
//   // make the call to the api
//   const apiCall = call(api.generateOTP, options);
//   const response = yield call(callApi, apiCall);

//   // success?
//   if (response.ok) {
//     yield put(LoginActions.generateOtpSuccess(response.data ));
//   } else {
//     yield put(LoginActions.generateOtpFailure(response.data));
//   }
// }

// // attempts to login otp
// export function* loginOtp(api,action) {
//   const { options } = action;

//   const response = yield call(api.loginOtp, options);

//   // success?
//   if (response.ok) {
//     yield call(api.setAuthToken, response.data.id_token);
//     yield put(LoginActions.loginSuccess(response.data.id_token));
//     yield put(AccountActions.accountRequest());
//     WebsocketService.setToken(response.data.id_token);
//     yield put({ type: 'RELOGIN_OK' });
//   } else {
//     const errorMessage = !response.data
//       ? 'Failed to reach backend API'
//       : response.data && response.data.detail
//       ? response.data.detail
//       : 'Bad credentials';
//     yield put(LoginActions.loginFailure(errorMessage));
//   }
// }

// attempts to login
export function* login(api, { username, password }) {
  const authObj = {
    username: username,
    password: password,
    rememberMe: true,
  };

  const response = yield call(api.login, authObj);

  // success?
  if (response.ok) {
    yield call(api.setAuthToken, response.data.id_token);
    yield put(LoginActions.loginSuccess(response.data.id_token));
    yield put(AccountActions.accountRequest());
   // WebsocketService.setToken(response.data.id_token);
    yield put({ type: 'RELOGIN_OK' });
  } else {
    const errorMessage = !response.data
      ? 'Failed to reach backend API'
      : response.data && response.data.detail
      ? response.data.detail
      : 'Bad credentials';
    yield put(LoginActions.loginFailure(errorMessage));
  }
}
// attempts to logout
export function* logout(api) {
  yield call(api.removeAuthToken);
  yield put(AccountActions.accountReset());
  yield put(AccountActions.accountRequest());
  yield put(LoginActions.logoutSuccess());
  yield put({ type: 'RELOGIN_ABORT' });
}

// loads the login
export function* loginLoad(api) {
  const authToken = yield select(selectAuthToken);
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken);
   // WebsocketService.setToken(authToken);
  }
  yield put(LoginActions.loginLoadSuccess());
}
