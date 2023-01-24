import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cityRequest: ['cityId'],
  cityAllRequest: ['options'],
  cityUpdateRequest: ['city'],
  cityDeleteRequest: ['cityId'],

  citySuccess: ['city'],
  cityAllSuccess: ['cityList', 'headers'],
  cityUpdateSuccess: ['city'],
  cityDeleteSuccess: [],

  cityFailure: ['error'],
  cityAllFailure: ['error'],
  cityUpdateFailure: ['error'],
  cityDeleteFailure: ['error'],

  cityReset: [],
});

export const CityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  city: { id: undefined },
  cityList: [],
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
    city: INITIAL_STATE.city,
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
  const { city } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    city,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { cityList, headers } = action;
   return state.merge({
    fetchingAll: false,
    errorAll: null,
      cityList 
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { city } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    city,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    city: INITIAL_STATE.city,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    city: INITIAL_STATE.city,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    cityList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    city: state.city,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    city: state.city,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CITY_REQUEST]: request,
  [Types.CITY_ALL_REQUEST]: allRequest,
  [Types.CITY_UPDATE_REQUEST]: updateRequest,
  [Types.CITY_DELETE_REQUEST]: deleteRequest,

  [Types.CITY_SUCCESS]: success,
  [Types.CITY_ALL_SUCCESS]: allSuccess,
  [Types.CITY_UPDATE_SUCCESS]: updateSuccess,
  [Types.CITY_DELETE_SUCCESS]: deleteSuccess,

  [Types.CITY_FAILURE]: failure,
  [Types.CITY_ALL_FAILURE]: allFailure,
  [Types.CITY_UPDATE_FAILURE]: updateFailure,
  [Types.CITY_DELETE_FAILURE]: deleteFailure,
  [Types.CITY_RESET]: reset,
});
