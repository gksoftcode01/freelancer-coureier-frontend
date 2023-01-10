import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cargoRequestDetailsRequest: ['cargoRequestDetailsId'],
  cargoRequestDetailsAllRequest: ['options'],
  cargoRequestDetailsUpdateRequest: ['cargoRequestDetails'],
  cargoRequestDetailsDeleteRequest: ['cargoRequestDetailsId'],

  cargoRequestDetailsSuccess: ['cargoRequestDetails'],
  cargoRequestDetailsAllSuccess: ['cargoRequestDetailsList', 'headers'],
  cargoRequestDetailsUpdateSuccess: ['cargoRequestDetails'],
  cargoRequestDetailsDeleteSuccess: [],

  cargoRequestDetailsFailure: ['error'],
  cargoRequestDetailsAllFailure: ['error'],
  cargoRequestDetailsUpdateFailure: ['error'],
  cargoRequestDetailsDeleteFailure: ['error'],

  cargoRequestDetailsReset: [],
});

export const CargoRequestDetailsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  cargoRequestDetails: { id: undefined },
  cargoRequestDetailsList: [],
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
    cargoRequestDetails: INITIAL_STATE.cargoRequestDetails,
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
  const { cargoRequestDetails } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    cargoRequestDetails,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { cargoRequestDetailsList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    cargoRequestDetailsList: loadMoreDataWhenScrolled(state.cargoRequestDetailsList, cargoRequestDetailsList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { cargoRequestDetails } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    cargoRequestDetails,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    cargoRequestDetails: INITIAL_STATE.cargoRequestDetails,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    cargoRequestDetails: INITIAL_STATE.cargoRequestDetails,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    cargoRequestDetailsList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    cargoRequestDetails: state.cargoRequestDetails,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    cargoRequestDetails: state.cargoRequestDetails,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CARGO_REQUEST_DETAILS_REQUEST]: request,
  [Types.CARGO_REQUEST_DETAILS_ALL_REQUEST]: allRequest,
  [Types.CARGO_REQUEST_DETAILS_UPDATE_REQUEST]: updateRequest,
  [Types.CARGO_REQUEST_DETAILS_DELETE_REQUEST]: deleteRequest,

  [Types.CARGO_REQUEST_DETAILS_SUCCESS]: success,
  [Types.CARGO_REQUEST_DETAILS_ALL_SUCCESS]: allSuccess,
  [Types.CARGO_REQUEST_DETAILS_UPDATE_SUCCESS]: updateSuccess,
  [Types.CARGO_REQUEST_DETAILS_DELETE_SUCCESS]: deleteSuccess,

  [Types.CARGO_REQUEST_DETAILS_FAILURE]: failure,
  [Types.CARGO_REQUEST_DETAILS_ALL_FAILURE]: allFailure,
  [Types.CARGO_REQUEST_DETAILS_UPDATE_FAILURE]: updateFailure,
  [Types.CARGO_REQUEST_DETAILS_DELETE_FAILURE]: deleteFailure,
  [Types.CARGO_REQUEST_DETAILS_RESET]: reset,
});
