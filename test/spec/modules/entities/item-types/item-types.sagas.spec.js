import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ItemTypesSagas from '../../../../../app/modules/entities/item-types/item-types.sagas';
import ItemTypesActions from '../../../../../app/modules/entities/item-types/item-types.reducer';

const { getItemTypes, getAllItemTypes, updateItemTypes, deleteItemTypes } = ItemTypesSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getItemTypes(1);
  const step = stepper(getItemTypes(FixtureAPI, { itemTypesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getItemTypes(FixtureAPI, { itemTypesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllItemTypes();
  const step = stepper(getAllItemTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllItemTypes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateItemTypes({ id: 1 });
  const step = stepper(updateItemTypes(FixtureAPI, { itemTypes: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateItemTypes(FixtureAPI, { itemTypes: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteItemTypes({ id: 1 });
  const step = stepper(deleteItemTypes(FixtureAPI, { itemTypesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteItemTypes(FixtureAPI, { itemTypesId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ItemTypesActions.itemTypesDeleteFailure()));
});
