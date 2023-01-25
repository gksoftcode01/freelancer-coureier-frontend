import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CargoRequestActions from './cargo-request.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getCargoRequest(api, action) {
  const { cargoRequestId } = action;
  // make the call to the api
  const apiCall = call(api.getCargoRequest, cargoRequestId);
  const response = yield call(callApi, apiCall);
   // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
     yield put(CargoRequestActions.cargoRequestSuccess(response.data));
  } else {
    yield put(CargoRequestActions.cargoRequestFailure(response.data));
  }
}

function* getAllCargoRequests(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCargoRequests, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestActions.cargoRequestAllSuccess(response.data, response.headers));
  } else {
    yield put(CargoRequestActions.cargoRequestAllFailure(response.data));
  }
}

function* updateCargoRequest(api, action) {
  const { cargoRequest } = action;
  // make the call to the api
  const idIsNotNull = !(cargoRequest.id === null || cargoRequest.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCargoRequest : api.createCargoRequest, cargoRequest);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(CargoRequestActions.cargoRequestUpdateSuccess(response.data));
  } else {
    yield put(CargoRequestActions.cargoRequestUpdateFailure(response.data));
  }
}

function* deleteCargoRequest(api, action) {
  const { cargoRequestId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCargoRequest, cargoRequestId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CargoRequestActions.cargoRequestDeleteSuccess());
  } else {
    yield put(CargoRequestActions.cargoRequestDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.createDate = convertDateTimeFromServer(data.createDate);
  return data;
}

export default {
  getAllCargoRequests,
  getCargoRequest,
  deleteCargoRequest,
  updateCargoRequest,
};
