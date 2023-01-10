import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CitySagas from '../../../../../app/modules/entities/city/city.sagas';
import CityActions from '../../../../../app/modules/entities/city/city.reducer';

const { getCity, getAllCities, updateCity, deleteCity } = CitySagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCity(1);
  const step = stepper(getCity(FixtureAPI, { cityId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CityActions.citySuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCity(FixtureAPI, { cityId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CityActions.cityFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCities();
  const step = stepper(getAllCities(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CityActions.cityAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCities(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CityActions.cityAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCity({ id: 1 });
  const step = stepper(updateCity(FixtureAPI, { city: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CityActions.cityUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCity(FixtureAPI, { city: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CityActions.cityUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCity({ id: 1 });
  const step = stepper(deleteCity(FixtureAPI, { cityId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CityActions.cityDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCity(FixtureAPI, { cityId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CityActions.cityDeleteFailure()));
});
