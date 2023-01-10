import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/item-types/item-types.reducer';

test('attempt retrieving a single itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.itemTypes).toEqual({ id: undefined });
});

test('attempt retrieving a list of itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.itemTypesList).toEqual([]);
});

test('attempt updating a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.itemTypes).toEqual({ id: 1 });
});

test('success retrieving a list of itemTypes', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.itemTypesAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.itemTypesList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.itemTypes).toEqual({ id: 1 });
});
test('success deleting a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.itemTypes).toEqual({ id: undefined });
});

test('failure retrieving a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.itemTypes).toEqual({ id: undefined });
});

test('failure retrieving a list of itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.itemTypesList).toEqual([]);
});

test('failure updating a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.itemTypes).toEqual(INITIAL_STATE.itemTypes);
});
test('failure deleting a itemTypes', () => {
  const state = reducer(INITIAL_STATE, Actions.itemTypesDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.itemTypes).toEqual(INITIAL_STATE.itemTypes);
});

test('resetting state for itemTypes', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.itemTypesReset());
  expect(state).toEqual(INITIAL_STATE);
});
