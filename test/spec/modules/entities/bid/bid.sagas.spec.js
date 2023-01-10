import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import BidSagas from '../../../../../app/modules/entities/bid/bid.sagas';
import BidActions from '../../../../../app/modules/entities/bid/bid.reducer';

const { getBid, getAllBids, updateBid, deleteBid } = BidSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getBid(1);
  const step = stepper(getBid(FixtureAPI, { bidId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BidActions.bidSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getBid(FixtureAPI, { bidId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BidActions.bidFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllBids();
  const step = stepper(getAllBids(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BidActions.bidAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllBids(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BidActions.bidAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateBid({ id: 1 });
  const step = stepper(updateBid(FixtureAPI, { bid: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BidActions.bidUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateBid(FixtureAPI, { bid: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BidActions.bidUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteBid({ id: 1 });
  const step = stepper(deleteBid(FixtureAPI, { bidId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BidActions.bidDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteBid(FixtureAPI, { bidId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BidActions.bidDeleteFailure()));
});
