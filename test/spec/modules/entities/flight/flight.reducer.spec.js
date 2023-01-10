import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/flight/flight.reducer';

test('attempt retrieving a single flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.flight).toEqual({ id: undefined });
});

test('attempt retrieving a list of flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.flightList).toEqual([]);
});

test('attempt updating a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.flight).toEqual({ id: 1 });
});

test('success retrieving a list of flight', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.flightAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.flightList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.flight).toEqual({ id: 1 });
});
test('success deleting a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.flight).toEqual({ id: undefined });
});

test('failure retrieving a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.flight).toEqual({ id: undefined });
});

test('failure retrieving a list of flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.flightList).toEqual([]);
});

test('failure updating a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.flight).toEqual(INITIAL_STATE.flight);
});
test('failure deleting a flight', () => {
  const state = reducer(INITIAL_STATE, Actions.flightDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.flight).toEqual(INITIAL_STATE.flight);
});

test('resetting state for flight', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.flightReset());
  expect(state).toEqual(INITIAL_STATE);
});
