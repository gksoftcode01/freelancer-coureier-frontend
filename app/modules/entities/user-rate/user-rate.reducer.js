import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRateRequest: ['userRateId'],
  userRateAllRequest: ['options'],
  userRateUpdateRequest: ['userRate'],
  userRateDeleteRequest: ['userRateId'],

  userRateSuccess: ['userRate'],
  userRateAllSuccess: ['userRateList', 'headers'],
  userRateUpdateSuccess: ['userRate'],
  userRateDeleteSuccess: [],

  userRateFailure: ['error'],
  userRateAllFailure: ['error'],
  userRateUpdateFailure: ['error'],
  userRateDeleteFailure: ['error'],

  userRateReset: [],
});

export const UserRateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  userRate: { id: undefined },
  userRateList: [],
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
    userRate: INITIAL_STATE.userRate,
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
  const { userRate } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    userRate,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { userRateList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    userRateList: loadMoreDataWhenScrolled(state.userRateList, userRateList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { userRate } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    userRate,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    userRate: INITIAL_STATE.userRate,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    userRate: INITIAL_STATE.userRate,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    userRateList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    userRate: state.userRate,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    userRate: state.userRate,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_RATE_REQUEST]: request,
  [Types.USER_RATE_ALL_REQUEST]: allRequest,
  [Types.USER_RATE_UPDATE_REQUEST]: updateRequest,
  [Types.USER_RATE_DELETE_REQUEST]: deleteRequest,

  [Types.USER_RATE_SUCCESS]: success,
  [Types.USER_RATE_ALL_SUCCESS]: allSuccess,
  [Types.USER_RATE_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_RATE_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_RATE_FAILURE]: failure,
  [Types.USER_RATE_ALL_FAILURE]: allFailure,
  [Types.USER_RATE_UPDATE_FAILURE]: updateFailure,
  [Types.USER_RATE_DELETE_FAILURE]: deleteFailure,
  [Types.USER_RATE_RESET]: reset,
});
