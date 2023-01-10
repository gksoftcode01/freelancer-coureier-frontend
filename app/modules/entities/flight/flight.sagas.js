import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import FlightActions from './flight.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getFlight(api, action) {
  const { flightId } = action;
  // make the call to the api
  const apiCall = call(api.getFlight, flightId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(FlightActions.flightSuccess(response.data));
  } else {
    yield put(FlightActions.flightFailure(response.data));
  }
}

function* getAllFlights(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllFlights, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FlightActions.flightAllSuccess(response.data, response.headers));
  } else {
    yield put(FlightActions.flightAllFailure(response.data));
  }
}

function* updateFlight(api, action) {
  const { flight } = action;
  // make the call to the api
  const idIsNotNull = !(flight.id === null || flight.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateFlight : api.createFlight, flight);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(FlightActions.flightUpdateSuccess(response.data));
  } else {
    yield put(FlightActions.flightUpdateFailure(response.data));
  }
}

function* deleteFlight(api, action) {
  const { flightId } = action;
  // make the call to the api
  const apiCall = call(api.deleteFlight, flightId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FlightActions.flightDeleteSuccess());
  } else {
    yield put(FlightActions.flightDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.flightDate = convertDateTimeFromServer(data.flightDate);
  data.createDate = convertDateTimeFromServer(data.createDate);
  return data;
}

export default {
  getAllFlights,
  getFlight,
  deleteFlight,
  updateFlight,
};
