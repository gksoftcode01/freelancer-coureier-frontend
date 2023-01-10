import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/state-province/state-province.reducer';

test('attempt retrieving a single stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.stateProvince).toEqual({ id: undefined });
});

test('attempt retrieving a list of stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.stateProvinceList).toEqual([]);
});

test('attempt updating a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.stateProvince).toEqual({ id: 1 });
});

test('success retrieving a list of stateProvince', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.stateProvinceAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.stateProvinceList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.stateProvince).toEqual({ id: 1 });
});
test('success deleting a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.stateProvince).toEqual({ id: undefined });
});

test('failure retrieving a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.stateProvince).toEqual({ id: undefined });
});

test('failure retrieving a list of stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.stateProvinceList).toEqual([]);
});

test('failure updating a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.stateProvince).toEqual(INITIAL_STATE.stateProvince);
});
test('failure deleting a stateProvince', () => {
  const state = reducer(INITIAL_STATE, Actions.stateProvinceDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.stateProvince).toEqual(INITIAL_STATE.stateProvince);
});

test('resetting state for stateProvince', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.stateProvinceReset());
  expect(state).toEqual(INITIAL_STATE);
});
