import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/ask/ask.reducer';

test('attempt retrieving a single ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.ask).toEqual({ id: undefined });
});

test('attempt retrieving a list of ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.askList).toEqual([]);
});

test('attempt updating a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.ask).toEqual({ id: 1 });
});

test('success retrieving a list of ask', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.askAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.askList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.ask).toEqual({ id: 1 });
});
test('success deleting a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.ask).toEqual({ id: undefined });
});

test('failure retrieving a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.ask).toEqual({ id: undefined });
});

test('failure retrieving a list of ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.askList).toEqual([]);
});

test('failure updating a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.ask).toEqual(INITIAL_STATE.ask);
});
test('failure deleting a ask', () => {
  const state = reducer(INITIAL_STATE, Actions.askDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.ask).toEqual(INITIAL_STATE.ask);
});

test('resetting state for ask', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.askReset());
  expect(state).toEqual(INITIAL_STATE);
});
