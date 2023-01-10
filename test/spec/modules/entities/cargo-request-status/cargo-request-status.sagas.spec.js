import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CargoRequestStatusSagas from '../../../../../app/modules/entities/cargo-request-status/cargo-request-status.sagas';
import CargoRequestStatusActions from '../../../../../app/modules/entities/cargo-request-status/cargo-request-status.reducer';

const { getCargoRequestStatus, getAllCargoRequestStatuses, updateCargoRequestStatus, deleteCargoRequestStatus } = CargoRequestStatusSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCargoRequestStatus(1);
  const step = stepper(getCargoRequestStatus(FixtureAPI, { cargoRequestStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCargoRequestStatus(FixtureAPI, { cargoRequestStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCargoRequestStatuses();
  const step = stepper(getAllCargoRequestStatuses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCargoRequestStatuses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCargoRequestStatus({ id: 1 });
  const step = stepper(updateCargoRequestStatus(FixtureAPI, { cargoRequestStatus: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCargoRequestStatus(FixtureAPI, { cargoRequestStatus: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCargoRequestStatus({ id: 1 });
  const step = stepper(deleteCargoRequestStatus(FixtureAPI, { cargoRequestStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCargoRequestStatus(FixtureAPI, { cargoRequestStatusId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestStatusActions.cargoRequestStatusDeleteFailure()));
});
