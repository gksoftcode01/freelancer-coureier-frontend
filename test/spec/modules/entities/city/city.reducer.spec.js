import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/city/city.reducer';

test('attempt retrieving a single city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.city).toEqual({ id: undefined });
});

test('attempt retrieving a list of city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.cityList).toEqual([]);
});

test('attempt updating a city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a city', () => {
  const state = reducer(INITIAL_STATE, Actions.citySuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.city).toEqual({ id: 1 });
});

test('success retrieving a list of city', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.cityAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.cityList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.city).toEqual({ id: 1 });
});
test('success deleting a city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.city).toEqual({ id: undefined });
});

test('failure retrieving a city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.city).toEqual({ id: undefined });
});

test('failure retrieving a list of city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.cityList).toEqual([]);
});

test('failure updating a city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.city).toEqual(INITIAL_STATE.city);
});
test('failure deleting a city', () => {
  const state = reducer(INITIAL_STATE, Actions.cityDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.city).toEqual(INITIAL_STATE.city);
});

test('resetting state for city', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.cityReset());
  expect(state).toEqual(INITIAL_STATE);
});
