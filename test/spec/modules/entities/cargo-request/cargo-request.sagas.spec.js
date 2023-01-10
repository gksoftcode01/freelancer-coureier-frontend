import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CargoRequestSagas from '../../../../../app/modules/entities/cargo-request/cargo-request.sagas';
import CargoRequestActions from '../../../../../app/modules/entities/cargo-request/cargo-request.reducer';

const { getCargoRequest, getAllCargoRequests, updateCargoRequest, deleteCargoRequest } = CargoRequestSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCargoRequest(1);
  const step = stepper(getCargoRequest(FixtureAPI, { cargoRequestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCargoRequest(FixtureAPI, { cargoRequestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCargoRequests();
  const step = stepper(getAllCargoRequests(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCargoRequests(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCargoRequest({ id: 1 });
  const step = stepper(updateCargoRequest(FixtureAPI, { cargoRequest: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCargoRequest(FixtureAPI, { cargoRequest: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCargoRequest({ id: 1 });
  const step = stepper(deleteCargoRequest(FixtureAPI, { cargoRequestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCargoRequest(FixtureAPI, { cargoRequestId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestActions.cargoRequestDeleteFailure()));
});
