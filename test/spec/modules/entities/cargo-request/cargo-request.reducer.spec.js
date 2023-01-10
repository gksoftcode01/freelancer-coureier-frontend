import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/cargo-request/cargo-request.reducer';

test('attempt retrieving a single cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.cargoRequest).toEqual({ id: undefined });
});

test('attempt retrieving a list of cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.cargoRequestList).toEqual([]);
});

test('attempt updating a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.cargoRequest).toEqual({ id: 1 });
});

test('success retrieving a list of cargoRequest', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.cargoRequestAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.cargoRequestList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.cargoRequest).toEqual({ id: 1 });
});
test('success deleting a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.cargoRequest).toEqual({ id: undefined });
});

test('failure retrieving a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.cargoRequest).toEqual({ id: undefined });
});

test('failure retrieving a list of cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.cargoRequestList).toEqual([]);
});

test('failure updating a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.cargoRequest).toEqual(INITIAL_STATE.cargoRequest);
});
test('failure deleting a cargoRequest', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.cargoRequest).toEqual(INITIAL_STATE.cargoRequest);
});

test('resetting state for cargoRequest', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.cargoRequestReset());
  expect(state).toEqual(INITIAL_STATE);
});
