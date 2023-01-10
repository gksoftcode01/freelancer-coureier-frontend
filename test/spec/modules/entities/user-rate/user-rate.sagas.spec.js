import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import UserRateSagas from '../../../../../app/modules/entities/user-rate/user-rate.sagas';
import UserRateActions from '../../../../../app/modules/entities/user-rate/user-rate.reducer';

const { getUserRate, getAllUserRates, updateUserRate, deleteUserRate } = UserRateSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getUserRate(1);
  const step = stepper(getUserRate(FixtureAPI, { userRateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserRateActions.userRateSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getUserRate(FixtureAPI, { userRateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserRateActions.userRateFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllUserRates();
  const step = stepper(getAllUserRates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserRateActions.userRateAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllUserRates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserRateActions.userRateAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateUserRate({ id: 1 });
  const step = stepper(updateUserRate(FixtureAPI, { userRate: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserRateActions.userRateUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateUserRate(FixtureAPI, { userRate: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserRateActions.userRateUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteUserRate({ id: 1 });
  const step = stepper(deleteUserRate(FixtureAPI, { userRateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserRateActions.userRateDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteUserRate(FixtureAPI, { userRateId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserRateActions.userRateDeleteFailure()));
});
