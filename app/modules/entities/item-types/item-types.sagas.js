import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ItemTypesActions from './item-types.reducer';

function* getItemTypes(api, action) {
  const { itemTypesId } = action;
  // make the call to the api
  const apiCall = call(api.getItemTypes, itemTypesId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ItemTypesActions.itemTypesSuccess(response.data));
  } else {
    yield put(ItemTypesActions.itemTypesFailure(response.data));
  }
}

function* getAllItemTypes(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllItemTypes, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ItemTypesActions.itemTypesAllSuccess(response.data, response.headers));
  } else {
    yield put(ItemTypesActions.itemTypesAllFailure(response.data));
  }
}

function* updateItemTypes(api, action) {
  const { itemTypes } = action;
  // make the call to the api
  const idIsNotNull = !(itemTypes.id === null || itemTypes.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateItemTypes : api.createItemTypes, itemTypes);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ItemTypesActions.itemTypesUpdateSuccess(response.data));
  } else {
    yield put(ItemTypesActions.itemTypesUpdateFailure(response.data));
  }
}

function* deleteItemTypes(api, action) {
  const { itemTypesId } = action;
  // make the call to the api
  const apiCall = call(api.deleteItemTypes, itemTypesId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ItemTypesActions.itemTypesDeleteSuccess());
  } else {
    yield put(ItemTypesActions.itemTypesDeleteFailure(response.data));
  }
}

export default {
  getAllItemTypes,
  getItemTypes,
  deleteItemTypes,
  updateItemTypes,
};
