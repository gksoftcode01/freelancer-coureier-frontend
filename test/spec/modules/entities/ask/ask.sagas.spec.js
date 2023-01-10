import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import AskSagas from '../../../../../app/modules/entities/ask/ask.sagas';
import AskActions from '../../../../../app/modules/entities/ask/ask.reducer';

const { getAsk, getAllAsks, updateAsk, deleteAsk } = AskSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getAsk(1);
  const step = stepper(getAsk(FixtureAPI, { askId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AskActions.askSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getAsk(FixtureAPI, { askId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AskActions.askFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllAsks();
  const step = stepper(getAllAsks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AskActions.askAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllAsks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AskActions.askAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateAsk({ id: 1 });
  const step = stepper(updateAsk(FixtureAPI, { ask: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AskActions.askUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateAsk(FixtureAPI, { ask: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AskActions.askUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteAsk({ id: 1 });
  const step = stepper(deleteAsk(FixtureAPI, { askId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AskActions.askDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteAsk(FixtureAPI, { askId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AskActions.askDeleteFailure()));
});
