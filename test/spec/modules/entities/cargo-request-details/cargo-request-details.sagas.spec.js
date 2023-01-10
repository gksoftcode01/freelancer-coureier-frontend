import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CargoRequestDetailsSagas from '../../../../../app/modules/entities/cargo-request-details/cargo-request-details.sagas';
import CargoRequestDetailsActions from '../../../../../app/modules/entities/cargo-request-details/cargo-request-details.reducer';

const { getCargoRequestDetails, getAllCargoRequestDetails, updateCargoRequestDetails, deleteCargoRequestDetails } =
  CargoRequestDetailsSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCargoRequestDetails(1);
  const step = stepper(getCargoRequestDetails(FixtureAPI, { cargoRequestDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCargoRequestDetails(FixtureAPI, { cargoRequestDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCargoRequestDetails();
  const step = stepper(getAllCargoRequestDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCargoRequestDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCargoRequestDetails({ id: 1 });
  const step = stepper(updateCargoRequestDetails(FixtureAPI, { cargoRequestDetails: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCargoRequestDetails(FixtureAPI, { cargoRequestDetails: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCargoRequestDetails({ id: 1 });
  const step = stepper(deleteCargoRequestDetails(FixtureAPI, { cargoRequestDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCargoRequestDetails(FixtureAPI, { cargoRequestDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CargoRequestDetailsActions.cargoRequestDetailsDeleteFailure()));
});
