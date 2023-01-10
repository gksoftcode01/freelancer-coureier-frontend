import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/bid/bid.reducer';

test('attempt retrieving a single bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.bid).toEqual({ id: undefined });
});

test('attempt retrieving a list of bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.bidList).toEqual([]);
});

test('attempt updating a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.bid).toEqual({ id: 1 });
});

test('success retrieving a list of bid', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.bidAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.bidList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.bid).toEqual({ id: 1 });
});
test('success deleting a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.bid).toEqual({ id: undefined });
});

test('failure retrieving a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.bid).toEqual({ id: undefined });
});

test('failure retrieving a list of bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.bidList).toEqual([]);
});

test('failure updating a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.bid).toEqual(INITIAL_STATE.bid);
});
test('failure deleting a bid', () => {
  const state = reducer(INITIAL_STATE, Actions.bidDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.bid).toEqual(INITIAL_STATE.bid);
});

test('resetting state for bid', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.bidReset());
  expect(state).toEqual(INITIAL_STATE);
});
