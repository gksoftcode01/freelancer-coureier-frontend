import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  askRequest: ['askId'],
  askAllRequest: ['options'],
  askUpdateRequest: ['ask'],
  askDeleteRequest: ['askId'],

  askSuccess: ['ask'],
  askAllSuccess: ['askList', 'headers'],
  askUpdateSuccess: ['ask'],
  askDeleteSuccess: [],

  askFailure: ['error'],
  askAllFailure: ['error'],
  askUpdateFailure: ['error'],
  askDeleteFailure: ['error'],

  askReset: [],
});

export const AskTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  ask: { id: undefined },
  askList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    ask: INITIAL_STATE.ask,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { ask } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    ask,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { askList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    askList: loadMoreDataWhenScrolled(state.askList, askList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { ask } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    ask,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    ask: INITIAL_STATE.ask,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    ask: INITIAL_STATE.ask,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    askList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    ask: state.ask,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    ask: state.ask,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ASK_REQUEST]: request,
  [Types.ASK_ALL_REQUEST]: allRequest,
  [Types.ASK_UPDATE_REQUEST]: updateRequest,
  [Types.ASK_DELETE_REQUEST]: deleteRequest,

  [Types.ASK_SUCCESS]: success,
  [Types.ASK_ALL_SUCCESS]: allSuccess,
  [Types.ASK_UPDATE_SUCCESS]: updateSuccess,
  [Types.ASK_DELETE_SUCCESS]: deleteSuccess,

  [Types.ASK_FAILURE]: failure,
  [Types.ASK_ALL_FAILURE]: allFailure,
  [Types.ASK_UPDATE_FAILURE]: updateFailure,
  [Types.ASK_DELETE_FAILURE]: deleteFailure,
  [Types.ASK_RESET]: reset,
});
