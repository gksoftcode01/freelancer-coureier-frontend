import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import AppUserActions from './app-user.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getAppUser(api, action) {
  const { appUserId } = action;
  // make the call to the api
  const apiCall = call(api.getAppUser, appUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(AppUserActions.appUserSuccess(response.data));
  } else {
    yield put(AppUserActions.appUserFailure(response.data));
  }
}

function* getAllAppUsers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllAppUsers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AppUserActions.appUserAllSuccess(response.data, response.headers));
  } else {
    yield put(AppUserActions.appUserAllFailure(response.data));
  }
}

function* updateAppUser(api, action) {
  const { appUser } = action;
  // make the call to the api
  const idIsNotNull = !(appUser.id === null || appUser.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateAppUser : api.createAppUser, appUser);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(AppUserActions.appUserUpdateSuccess(response.data));
  } else {
    yield put(AppUserActions.appUserUpdateFailure(response.data));
  }
}

function* deleteAppUser(api, action) {
  const { appUserId } = action;
  // make the call to the api
  const apiCall = call(api.deleteAppUser, appUserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AppUserActions.appUserDeleteSuccess());
  } else {
    yield put(AppUserActions.appUserDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.birthDate = convertDateTimeFromServer(data.birthDate);
  data.registerDate = convertDateTimeFromServer(data.registerDate);
  return data;
}

export default {
  getAllAppUsers,
  getAppUser,
  deleteAppUser,
  updateAppUser,
};
