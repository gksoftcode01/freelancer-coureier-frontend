import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/user-rate/user-rate.reducer';

test('attempt retrieving a single userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.userRate).toEqual({ id: undefined });
});

test('attempt retrieving a list of userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.userRateList).toEqual([]);
});

test('attempt updating a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.userRate).toEqual({ id: 1 });
});

test('success retrieving a list of userRate', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.userRateAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.userRateList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.userRate).toEqual({ id: 1 });
});
test('success deleting a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.userRate).toEqual({ id: undefined });
});

test('failure retrieving a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.userRate).toEqual({ id: undefined });
});

test('failure retrieving a list of userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.userRateList).toEqual([]);
});

test('failure updating a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.userRate).toEqual(INITIAL_STATE.userRate);
});
test('failure deleting a userRate', () => {
  const state = reducer(INITIAL_STATE, Actions.userRateDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.userRate).toEqual(INITIAL_STATE.userRate);
});

test('resetting state for userRate', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.userRateReset());
  expect(state).toEqual(INITIAL_STATE);
});
