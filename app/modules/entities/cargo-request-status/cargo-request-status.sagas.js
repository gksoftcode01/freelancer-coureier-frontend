import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CargoRequestStatusActions from './cargo-request-status.reducer';

function* getCargoRequestStatus(api, action) {
  const { cargoRequestStatusId } = action;
  // make the call to the api
  const apiCall = call(api.getCargoRequestStatus, cargoRequestStatusId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestStatusActions.cargoRequestStatusSuccess(response.data));
  } else {
    yield put(CargoRequestStatusActions.cargoRequestStatusFailure(response.data));
  }
}

function* getAllCargoRequestStatuses(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCargoRequestStatuses, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestStatusActions.cargoRequestStatusAllSuccess(response.data, response.headers));
  } else {
    yield put(CargoRequestStatusActions.cargoRequestStatusAllFailure(response.data));
  }
}

function* updateCargoRequestStatus(api, action) {
  const { cargoRequestStatus } = action;
  // make the call to the api
  const idIsNotNull = !(cargoRequestStatus.id === null || cargoRequestStatus.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCargoRequestStatus : api.createCargoRequestStatus, cargoRequestStatus);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestStatusActions.cargoRequestStatusUpdateSuccess(response.data));
  } else {
    yield put(CargoRequestStatusActions.cargoRequestStatusUpdateFailure(response.data));
  }
}

function* deleteCargoRequestStatus(api, action) {
  const { cargoRequestStatusId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCargoRequestStatus, cargoRequestStatusId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestStatusActions.cargoRequestStatusDeleteSuccess());
  } else {
    yield put(CargoRequestStatusActions.cargoRequestStatusDeleteFailure(response.data));
  }
}

export default {
  getAllCargoRequestStatuses,
  getCargoRequestStatus,
  deleteCargoRequestStatus,
  updateCargoRequestStatus,
};
