import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  countryRequest: ['countryId'],
  countryAllRequest: ['options'],
  countryUpdateRequest: ['country'],
  countryDeleteRequest: ['countryId'],

  countrySuccess: ['country'],
  countryAllSuccess: ['countryList', 'headers'],
  countryUpdateSuccess: ['country'],
  countryDeleteSuccess: [],

  countryFailure: ['error'],
  countryAllFailure: ['error'],
  countryUpdateFailure: ['error'],
  countryDeleteFailure: ['error'],

  countryReset: [],
});

export const CountryTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  country: { id: undefined },
  countryList: [],
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
    country: INITIAL_STATE.country,
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
  const { country } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    country,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { countryList } = action;
   return state.merge({
    fetchingAll: false,
    errorAll: null,
      countryList: countryList
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { country } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    country,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    country: INITIAL_STATE.country,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    country: INITIAL_STATE.country,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    countryList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    country: state.country,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    country: state.country,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COUNTRY_REQUEST]: request,
  [Types.COUNTRY_ALL_REQUEST]: allRequest,
  [Types.COUNTRY_UPDATE_REQUEST]: updateRequest,
  [Types.COUNTRY_DELETE_REQUEST]: deleteRequest,

  [Types.COUNTRY_SUCCESS]: success,
  [Types.COUNTRY_ALL_SUCCESS]: allSuccess,
  [Types.COUNTRY_UPDATE_SUCCESS]: updateSuccess,
  [Types.COUNTRY_DELETE_SUCCESS]: deleteSuccess,

  [Types.COUNTRY_FAILURE]: failure,
  [Types.COUNTRY_ALL_FAILURE]: allFailure,
  [Types.COUNTRY_UPDATE_FAILURE]: updateFailure,
  [Types.COUNTRY_DELETE_FAILURE]: deleteFailure,
  [Types.COUNTRY_RESET]: reset,
});
