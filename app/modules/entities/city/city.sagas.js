import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CityActions from './city.reducer';

function* getCity(api, action) {
  const { cityId } = action;
  // make the call to the api
  const apiCall = call(api.getCity, cityId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CityActions.citySuccess(response.data));
  } else {
    yield put(CityActions.cityFailure(response.data));
  }
}

function* getAllCities(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCities, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CityActions.cityAllSuccess(response.data, response.headers));
  } else {
    yield put(CityActions.cityAllFailure(response.data));
  }
}

function* updateCity(api, action) {
  const { city } = action;
  // make the call to the api
  const idIsNotNull = !(city.id === null || city.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCity : api.createCity, city);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CityActions.cityUpdateSuccess(response.data));
  } else {
    yield put(CityActions.cityUpdateFailure(response.data));
  }
}

function* deleteCity(api, action) {
  const { cityId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCity, cityId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CityActions.cityDeleteSuccess());
  } else {
    yield put(CityActions.cityDeleteFailure(response.data));
  }
}

export default {
  getAllCities,
  getCity,
  deleteCity,
  updateCity,
};
