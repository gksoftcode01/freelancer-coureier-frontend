import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  flightRequest: ['flightId'],
  flightAllRequest: ['options'],
  flightUpdateRequest: ['flight'],
  flightDeleteRequest: ['flightId'],
  flightFilter : ['filterentity'],
  getFlightFilter :[],
  flightSuccess: ['flight'],
  flightAllSuccess: ['flightList', 'headers'],
  flightUpdateSuccess: ['flight'],
  flightDeleteSuccess: [],

  flightFailure: ['error'],
  flightAllFailure: ['error'],
  flightUpdateFailure: ['error'],
  flightDeleteFailure: ['error'],

  flightReset: [],
});

export const FlightTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  flight: { id: undefined },
  flightList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
  filterentity : {
    fromCountry: null ,
    toCountry:  null,
    isMine : false,
    isAskSent :false,
    isChanged:false
  },
});

/* ------------- Reducers ------------- */
// request the data from an api
export const setFilter = (state,action) =>{ 
  const { filterentity } = action;
 return  state.merge({ 
    filterentity,
  });
}
export const getFilter = (state) =>{ 
  return  state;
}
// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    flight: INITIAL_STATE.flight,
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
  const { flight } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    flight,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { flightList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    flightList: loadMoreDataWhenScrolled(state.flightList, flightList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { flight } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    flight,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    flight: INITIAL_STATE.flight,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    flight: INITIAL_STATE.flight,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    flightList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    flight: state.flight,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    flight: state.flight,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FLIGHT_REQUEST]: request,
  [Types.FLIGHT_ALL_REQUEST]: allRequest,
  [Types.FLIGHT_UPDATE_REQUEST]: updateRequest,
  [Types.FLIGHT_DELETE_REQUEST]: deleteRequest,
  [Types.FLIGHT_FILTER]: setFilter,
  [Types.GET_FLIGHT_FILTER]: getFilter,
  [Types.FLIGHT_SUCCESS]: success,
  [Types.FLIGHT_ALL_SUCCESS]: allSuccess,
  [Types.FLIGHT_UPDATE_SUCCESS]: updateSuccess,
  [Types.FLIGHT_DELETE_SUCCESS]: deleteSuccess,

  [Types.FLIGHT_FAILURE]: failure,
  [Types.FLIGHT_ALL_FAILURE]: allFailure,
  [Types.FLIGHT_UPDATE_FAILURE]: updateFailure,
  [Types.FLIGHT_DELETE_FAILURE]: deleteFailure,
  [Types.FLIGHT_RESET]: reset,
});
