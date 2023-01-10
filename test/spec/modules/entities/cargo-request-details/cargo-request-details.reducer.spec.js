import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/cargo-request-details/cargo-request-details.reducer';

test('attempt retrieving a single cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.cargoRequestDetails).toEqual({ id: undefined });
});

test('attempt retrieving a list of cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.cargoRequestDetailsList).toEqual([]);
});

test('attempt updating a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.cargoRequestDetails).toEqual({ id: 1 });
});

test('success retrieving a list of cargoRequestDetails', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.cargoRequestDetailsAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.cargoRequestDetailsList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.cargoRequestDetails).toEqual({ id: 1 });
});
test('success deleting a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.cargoRequestDetails).toEqual({ id: undefined });
});

test('failure retrieving a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.cargoRequestDetails).toEqual({ id: undefined });
});

test('failure retrieving a list of cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.cargoRequestDetailsList).toEqual([]);
});

test('failure updating a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.cargoRequestDetails).toEqual(INITIAL_STATE.cargoRequestDetails);
});
test('failure deleting a cargoRequestDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.cargoRequestDetailsDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.cargoRequestDetails).toEqual(INITIAL_STATE.cargoRequestDetails);
});

test('resetting state for cargoRequestDetails', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.cargoRequestDetailsReset());
  expect(state).toEqual(INITIAL_STATE);
});
