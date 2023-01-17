import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import UserRateActions from './user-rate.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getUserRate(api, action) {
  const { userRateId } = action;
  // make the call to the api
  const apiCall = call(api.getUserRate, userRateId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(UserRateActions.userRateSuccess(response.data));
  } else {
    yield put(UserRateActions.userRateFailure(response.data));
  }
} 

function* getUserRateCargo(api, action) {
  const { cargoReqId } = action;
  // make the call to the api
  const apiCall = call(api.getUserRateCargo, cargoReqId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(UserRateActions.userRateAllSuccess(response.data));
  } else {
    yield put(UserRateActions.userRateAllFailure(response.data));
  }
} 

function* getAllUserRates(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllUserRates, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(UserRateActions.userRateAllSuccess(response.data, response.headers));
  } else {
    yield put(UserRateActions.userRateAllFailure(response.data));
  }
}

function* updateUserRate(api, action) {
  const { userRate } = action;
  // make the call to the api
  const idIsNotNull = !(userRate.id === null || userRate.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateUserRate : api.createUserRate, userRate);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(UserRateActions.userRateUpdateSuccess(response.data));
  } else {
    yield put(UserRateActions.userRateUpdateFailure(response.data));
  }
}

function* deleteUserRate(api, action) {
  const { userRateId } = action;
  // make the call to the api
  const apiCall = call(api.deleteUserRate, userRateId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(UserRateActions.userRateDeleteSuccess());
  } else {
    yield put(UserRateActions.userRateDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.rateDate = convertDateTimeFromServer(data.rateDate);
  return data;
}

export default {
  getAllUserRates,
  getUserRate,
  deleteUserRate,
  updateUserRate,
  getUserRateCargo
};
