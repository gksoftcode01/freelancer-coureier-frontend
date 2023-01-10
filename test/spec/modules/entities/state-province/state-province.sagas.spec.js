import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import StateProvinceSagas from '../../../../../app/modules/entities/state-province/state-province.sagas';
import StateProvinceActions from '../../../../../app/modules/entities/state-province/state-province.reducer';

const { getStateProvince, getAllStateProvinces, updateStateProvince, deleteStateProvince } = StateProvinceSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getStateProvince(1);
  const step = stepper(getStateProvince(FixtureAPI, { stateProvinceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getStateProvince(FixtureAPI, { stateProvinceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllStateProvinces();
  const step = stepper(getAllStateProvinces(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllStateProvinces(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateStateProvince({ id: 1 });
  const step = stepper(updateStateProvince(FixtureAPI, { stateProvince: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateStateProvince(FixtureAPI, { stateProvince: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteStateProvince({ id: 1 });
  const step = stepper(deleteStateProvince(FixtureAPI, { stateProvinceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteStateProvince(FixtureAPI, { stateProvinceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(StateProvinceActions.stateProvinceDeleteFailure()));
});
