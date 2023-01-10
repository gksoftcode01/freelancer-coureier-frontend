import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  itemTypesRequest: ['itemTypesId'],
  itemTypesAllRequest: ['options'],
  itemTypesUpdateRequest: ['itemTypes'],
  itemTypesDeleteRequest: ['itemTypesId'],

  itemTypesSuccess: ['itemTypes'],
  itemTypesAllSuccess: ['itemTypesList', 'headers'],
  itemTypesUpdateSuccess: ['itemTypes'],
  itemTypesDeleteSuccess: [],

  itemTypesFailure: ['error'],
  itemTypesAllFailure: ['error'],
  itemTypesUpdateFailure: ['error'],
  itemTypesDeleteFailure: ['error'],

  itemTypesReset: [],
});

export const ItemTypesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  itemTypes: { id: undefined },
  itemTypesList: [],
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
    itemTypes: INITIAL_STATE.itemTypes,
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
  const { itemTypes } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    itemTypes,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { itemTypesList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    itemTypesList: loadMoreDataWhenScrolled(state.itemTypesList, itemTypesList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { itemTypes } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    itemTypes,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    itemTypes: INITIAL_STATE.itemTypes,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    itemTypes: INITIAL_STATE.itemTypes,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    itemTypesList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    itemTypes: state.itemTypes,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    itemTypes: state.itemTypes,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ITEM_TYPES_REQUEST]: request,
  [Types.ITEM_TYPES_ALL_REQUEST]: allRequest,
  [Types.ITEM_TYPES_UPDATE_REQUEST]: updateRequest,
  [Types.ITEM_TYPES_DELETE_REQUEST]: deleteRequest,

  [Types.ITEM_TYPES_SUCCESS]: success,
  [Types.ITEM_TYPES_ALL_SUCCESS]: allSuccess,
  [Types.ITEM_TYPES_UPDATE_SUCCESS]: updateSuccess,
  [Types.ITEM_TYPES_DELETE_SUCCESS]: deleteSuccess,

  [Types.ITEM_TYPES_FAILURE]: failure,
  [Types.ITEM_TYPES_ALL_FAILURE]: allFailure,
  [Types.ITEM_TYPES_UPDATE_FAILURE]: updateFailure,
  [Types.ITEM_TYPES_DELETE_FAILURE]: deleteFailure,
  [Types.ITEM_TYPES_RESET]: reset,
});
