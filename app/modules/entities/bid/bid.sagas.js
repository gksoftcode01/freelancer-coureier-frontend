import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import BidActions from './bid.reducer';

function* getBid(api, action) {
  const { bidId } = action;
  // make the call to the api
  const apiCall = call(api.getBid, bidId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BidActions.bidSuccess(response.data));
  } else {
    yield put(BidActions.bidFailure(response.data));
  }
}

function* getAllBids(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllBids, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BidActions.bidAllSuccess(response.data, response.headers));
  } else {
    yield put(BidActions.bidAllFailure(response.data));
  }
}

function* updateBid(api, action) {
  const { bid } = action;
  // make the call to the api
  const idIsNotNull = !(bid.id === null || bid.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateBid : api.createBid, bid);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BidActions.bidUpdateSuccess(response.data));
  } else {
    yield put(BidActions.bidUpdateFailure(response.data));
  }
}

function* deleteBid(api, action) {
  const { bidId } = action;
  // make the call to the api
  const apiCall = call(api.deleteBid, bidId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BidActions.bidDeleteSuccess());
  } else {
    yield put(BidActions.bidDeleteFailure(response.data));
  }
}

export default {
  getAllBids,
  getBid,
  deleteBid,
  updateBid,
};
