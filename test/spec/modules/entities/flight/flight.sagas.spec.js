import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import FlightSagas from '../../../../../app/modules/entities/flight/flight.sagas';
import FlightActions from '../../../../../app/modules/entities/flight/flight.reducer';

const { getFlight, getAllFlights, updateFlight, deleteFlight } = FlightSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getFlight(1);
  const step = stepper(getFlight(FixtureAPI, { flightId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FlightActions.flightSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getFlight(FixtureAPI, { flightId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FlightActions.flightFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllFlights();
  const step = stepper(getAllFlights(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FlightActions.flightAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllFlights(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FlightActions.flightAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateFlight({ id: 1 });
  const step = stepper(updateFlight(FixtureAPI, { flight: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FlightActions.flightUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateFlight(FixtureAPI, { flight: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FlightActions.flightUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteFlight({ id: 1 });
  const step = stepper(deleteFlight(FixtureAPI, { flightId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FlightActions.flightDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteFlight(FixtureAPI, { flightId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FlightActions.flightDeleteFailure()));
});
