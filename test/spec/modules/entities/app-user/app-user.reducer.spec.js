import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/app-user/app-user.reducer';

test('attempt retrieving a single appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.appUser).toEqual({ id: undefined });
});

test('attempt retrieving a list of appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.appUserList).toEqual([]);
});

test('attempt updating a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.appUser).toEqual({ id: 1 });
});

test('success retrieving a list of appUser', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.appUserAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.appUserList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.appUser).toEqual({ id: 1 });
});
test('success deleting a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.appUser).toEqual({ id: undefined });
});

test('failure retrieving a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.appUser).toEqual({ id: undefined });
});

test('failure retrieving a list of appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.appUserList).toEqual([]);
});

test('failure updating a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.appUser).toEqual(INITIAL_STATE.appUser);
});
test('failure deleting a appUser', () => {
  const state = reducer(INITIAL_STATE, Actions.appUserDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.appUser).toEqual(INITIAL_STATE.appUser);
});

test('resetting state for appUser', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.appUserReset());
  expect(state).toEqual(INITIAL_STATE);
});
