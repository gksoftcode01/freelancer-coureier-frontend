import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cargoRequestRequest: ['cargoRequestId'],
  cargoRequestAllRequest: ['options'],
  cargoRequestUpdateRequest: ['cargoRequest'],
  cargoRequestDeleteRequest: ['cargoRequestId'],

  cargoRequestSuccess: ['cargoRequest'],
  cargoRequestAllSuccess: ['cargoRequestList', 'headers'],
  cargoRequestUpdateSuccess: ['cargoRequest'],
  cargoRequestDeleteSuccess: [],

  cargoRequestFailure: ['error'],
  cargoRequestAllFailure: ['error'],
  cargoRequestUpdateFailure: ['error'],
  cargoRequestDeleteFailure: ['error'],

  cargoRequestReset: [],
});

export const CargoRequestTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  cargoRequest: { id: undefined },
  cargoRequestList: [],
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
    cargoRequest: INITIAL_STATE.cargoRequest,
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
  const { cargoRequest } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    cargoRequest,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { cargoRequestList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    cargoRequestList: loadMoreDataWhenScrolled(state.cargoRequestList, cargoRequestList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { cargoRequest } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    cargoRequest,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    cargoRequest: INITIAL_STATE.cargoRequest,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    cargoRequest: INITIAL_STATE.cargoRequest,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    cargoRequestList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    cargoRequest: state.cargoRequest,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    cargoRequest: state.cargoRequest,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CARGO_REQUEST_REQUEST]: request,
  [Types.CARGO_REQUEST_ALL_REQUEST]: allRequest,
  [Types.CARGO_REQUEST_UPDATE_REQUEST]: updateRequest,
  [Types.CARGO_REQUEST_DELETE_REQUEST]: deleteRequest,

  [Types.CARGO_REQUEST_SUCCESS]: success,
  [Types.CARGO_REQUEST_ALL_SUCCESS]: allSuccess,
  [Types.CARGO_REQUEST_UPDATE_SUCCESS]: updateSuccess,
  [Types.CARGO_REQUEST_DELETE_SUCCESS]: deleteSuccess,

  [Types.CARGO_REQUEST_FAILURE]: failure,
  [Types.CARGO_REQUEST_ALL_FAILURE]: allFailure,
  [Types.CARGO_REQUEST_UPDATE_FAILURE]: updateFailure,
  [Types.CARGO_REQUEST_DELETE_FAILURE]: deleteFailure,
  [Types.CARGO_REQUEST_RESET]: reset,
});
