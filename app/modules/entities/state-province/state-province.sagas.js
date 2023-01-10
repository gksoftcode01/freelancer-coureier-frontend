import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import StateProvinceActions from './state-province.reducer';

function* getStateProvince(api, action) {
  const { stateProvinceId } = action;
  // make the call to the api
  const apiCall = call(api.getStateProvince, stateProvinceId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(StateProvinceActions.stateProvinceSuccess(response.data));
  } else {
    yield put(StateProvinceActions.stateProvinceFailure(response.data));
  }
}

function* getAllStateProvinces(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllStateProvinces, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(StateProvinceActions.stateProvinceAllSuccess(response.data, response.headers));
  } else {
    yield put(StateProvinceActions.stateProvinceAllFailure(response.data));
  }
}

function* updateStateProvince(api, action) {
  const { stateProvince } = action;
  // make the call to the api
  const idIsNotNull = !(stateProvince.id === null || stateProvince.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateStateProvince : api.createStateProvince, stateProvince);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(StateProvinceActions.stateProvinceUpdateSuccess(response.data));
  } else {
    yield put(StateProvinceActions.stateProvinceUpdateFailure(response.data));
  }
}

function* deleteStateProvince(api, action) {
  const { stateProvinceId } = action;
  // make the call to the api
  const apiCall = call(api.deleteStateProvince, stateProvinceId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(StateProvinceActions.stateProvinceDeleteSuccess());
  } else {
    yield put(StateProvinceActions.stateProvinceDeleteFailure(response.data));
  }
}

export default {
  getAllStateProvinces,
  getStateProvince,
  deleteStateProvince,
  updateStateProvince,
};
