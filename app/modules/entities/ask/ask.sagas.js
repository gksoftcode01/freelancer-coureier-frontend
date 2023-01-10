import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import AskActions from './ask.reducer';

function* getAsk(api, action) {
  const { askId } = action;
  // make the call to the api
  const apiCall = call(api.getAsk, askId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AskActions.askSuccess(response.data));
  } else {
    yield put(AskActions.askFailure(response.data));
  }
}

function* getAllAsks(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllAsks, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AskActions.askAllSuccess(response.data, response.headers));
  } else {
    yield put(AskActions.askAllFailure(response.data));
  }
}

function* updateAsk(api, action) {
  const { ask } = action;
  // make the call to the api
  const idIsNotNull = !(ask.id === null || ask.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateAsk : api.createAsk, ask);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AskActions.askUpdateSuccess(response.data));
  } else {
    yield put(AskActions.askUpdateFailure(response.data));
  }
}

function* deleteAsk(api, action) {
  const { askId } = action;
  // make the call to the api
  const apiCall = call(api.deleteAsk, askId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AskActions.askDeleteSuccess());
  } else {
    yield put(AskActions.askDeleteFailure(response.data));
  }
}

export default {
  getAllAsks,
  getAsk,
  deleteAsk,
  updateAsk,
};
