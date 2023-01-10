import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CargoRequestDetailsActions from './cargo-request-details.reducer';

function* getCargoRequestDetails(api, action) {
  const { cargoRequestDetailsId } = action;
  // make the call to the api
  const apiCall = call(api.getCargoRequestDetails, cargoRequestDetailsId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsSuccess(response.data));
  } else {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsFailure(response.data));
  }
}

function* getAllCargoRequestDetails(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCargoRequestDetails, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsAllSuccess(response.data, response.headers));
  } else {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsAllFailure(response.data));
  }
}

function* updateCargoRequestDetails(api, action) {
  const { cargoRequestDetails } = action;
  // make the call to the api
  const idIsNotNull = !(cargoRequestDetails.id === null || cargoRequestDetails.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCargoRequestDetails : api.createCargoRequestDetails, cargoRequestDetails);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsUpdateSuccess(response.data));
  } else {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsUpdateFailure(response.data));
  }
}

function* deleteCargoRequestDetails(api, action) {
  const { cargoRequestDetailsId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCargoRequestDetails, cargoRequestDetailsId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsDeleteSuccess());
  } else {
    yield put(CargoRequestDetailsActions.cargoRequestDetailsDeleteFailure(response.data));
  }
}

export default {
  getAllCargoRequestDetails,
  getCargoRequestDetails,
  deleteCargoRequestDetails,
  updateCargoRequestDetails,
};
