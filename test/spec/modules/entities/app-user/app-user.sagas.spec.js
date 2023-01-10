import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import AppUserSagas from '../../../../../app/modules/entities/app-user/app-user.sagas';
import AppUserActions from '../../../../../app/modules/entities/app-user/app-user.reducer';

const { getAppUser, getAllAppUsers, updateAppUser, deleteAppUser } = AppUserSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getAppUser(1);
  const step = stepper(getAppUser(FixtureAPI, { appUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppUserActions.appUserSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getAppUser(FixtureAPI, { appUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppUserActions.appUserFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllAppUsers();
  const step = stepper(getAllAppUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppUserActions.appUserAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllAppUsers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppUserActions.appUserAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateAppUser({ id: 1 });
  const step = stepper(updateAppUser(FixtureAPI, { appUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppUserActions.appUserUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateAppUser(FixtureAPI, { appUser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppUserActions.appUserUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteAppUser({ id: 1 });
  const step = stepper(deleteAppUser(FixtureAPI, { appUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppUserActions.appUserDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteAppUser(FixtureAPI, { appUserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppUserActions.appUserDeleteFailure()));
});
