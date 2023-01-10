import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appUserRequest: ['appUserId'],
  appUserAllRequest: ['options'],
  appUserUpdateRequest: ['appUser'],
  appUserDeleteRequest: ['appUserId'],

  appUserSuccess: ['appUser'],
  appUserAllSuccess: ['appUserList', 'headers'],
  appUserUpdateSuccess: ['appUser'],
  appUserDeleteSuccess: [],

  appUserFailure: ['error'],
  appUserAllFailure: ['error'],
  appUserUpdateFailure: ['error'],
  appUserDeleteFailure: ['error'],

  appUserReset: [],
});

export const AppUserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  appUser: { id: undefined },
  appUserList: [],
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
    appUser: INITIAL_STATE.appUser,
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
  const { appUser } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    appUser,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { appUserList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    appUserList: loadMoreDataWhenScrolled(state.appUserList, appUserList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { appUser } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    appUser,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    appUser: INITIAL_STATE.appUser,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    appUser: INITIAL_STATE.appUser,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    appUserList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    appUser: state.appUser,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    appUser: state.appUser,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APP_USER_REQUEST]: request,
  [Types.APP_USER_ALL_REQUEST]: allRequest,
  [Types.APP_USER_UPDATE_REQUEST]: updateRequest,
  [Types.APP_USER_DELETE_REQUEST]: deleteRequest,

  [Types.APP_USER_SUCCESS]: success,
  [Types.APP_USER_ALL_SUCCESS]: allSuccess,
  [Types.APP_USER_UPDATE_SUCCESS]: updateSuccess,
  [Types.APP_USER_DELETE_SUCCESS]: deleteSuccess,

  [Types.APP_USER_FAILURE]: failure,
  [Types.APP_USER_ALL_FAILURE]: allFailure,
  [Types.APP_USER_UPDATE_FAILURE]: updateFailure,
  [Types.APP_USER_DELETE_FAILURE]: deleteFailure,
  [Types.APP_USER_RESET]: reset,
});
