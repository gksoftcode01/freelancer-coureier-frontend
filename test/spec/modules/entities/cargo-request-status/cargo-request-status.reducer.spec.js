import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/cargo-request-status/cargo-request-status.reducer';

test('attempt retrieving a single cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.cargoRequestStatus).toEqual({ id: undefined });
});

test('attempt retrieving a list of cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.cargoRequestStatusList).toEqual([]);
});

test('attempt updating a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.cargoRequestStatus).toEqual({ id: 1 });
});

test('success retrieving a list of cargoRequestStatus', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.cargoRequestStatusAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.cargoRequestStatusList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.cargoRequestStatus).toEqual({ id: 1 });
});
test('success deleting a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.cargoRequestStatus).toEqual({ id: undefined });
});

test('failure retrieving a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.cargoRequestStatus).toEqual({ id: undefined });
});

test('failure retrieving a list of cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.cargoRequestStatusList).toEqual([]);
});

test('failure updating a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.cargoRequestStatus).toEqual(INITIAL_STATE.cargoRequestStatus);
});
test('failure deleting a cargoRequestStatus', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestStatusDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.cargoRequestStatus).toEqual(INITIAL_STATE.cargoRequestStatus);
});

test('resetting state for cargoRequestStatus', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.cargoRequestStatusReset());
  expect(state).toEqual(INITIAL_STATE);
});
