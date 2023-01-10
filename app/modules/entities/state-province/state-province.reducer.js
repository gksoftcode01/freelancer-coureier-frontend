import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  stateProvinceRequest: ['stateProvinceId'],
  stateProvinceAllRequest: ['options'],
  stateProvinceUpdateRequest: ['stateProvince'],
  stateProvinceDeleteRequest: ['stateProvinceId'],

  stateProvinceSuccess: ['stateProvince'],
  stateProvinceAllSuccess: ['stateProvinceList', 'headers'],
  stateProvinceUpdateSuccess: ['stateProvince'],
  stateProvinceDeleteSuccess: [],

  stateProvinceFailure: ['error'],
  stateProvinceAllFailure: ['error'],
  stateProvinceUpdateFailure: ['error'],
  stateProvinceDeleteFailure: ['error'],

  stateProvinceReset: [],
});

export const StateProvinceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  stateProvince: { id: undefined },
  stateProvinceList: [],
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
    stateProvince: INITIAL_STATE.stateProvince,
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
  const { stateProvince } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    stateProvince,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { stateProvinceList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    stateProvinceList: loadMoreDataWhenScrolled(state.stateProvinceList, stateProvinceList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { stateProvince } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    stateProvince,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    stateProvince: INITIAL_STATE.stateProvince,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    stateProvince: INITIAL_STATE.stateProvince,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    stateProvinceList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    stateProvince: state.stateProvince,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    stateProvince: state.stateProvince,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STATE_PROVINCE_REQUEST]: request,
  [Types.STATE_PROVINCE_ALL_REQUEST]: allRequest,
  [Types.STATE_PROVINCE_UPDATE_REQUEST]: updateRequest,
  [Types.STATE_PROVINCE_DELETE_REQUEST]: deleteRequest,

  [Types.STATE_PROVINCE_SUCCESS]: success,
  [Types.STATE_PROVINCE_ALL_SUCCESS]: allSuccess,
  [Types.STATE_PROVINCE_UPDATE_SUCCESS]: updateSuccess,
  [Types.STATE_PROVINCE_DELETE_SUCCESS]: deleteSuccess,

  [Types.STATE_PROVINCE_FAILURE]: failure,
  [Types.STATE_PROVINCE_ALL_FAILURE]: allFailure,
  [Types.STATE_PROVINCE_UPDATE_FAILURE]: updateFailure,
  [Types.STATE_PROVINCE_DELETE_FAILURE]: deleteFailure,
  [Types.STATE_PROVINCE_RESET]: reset,
});
