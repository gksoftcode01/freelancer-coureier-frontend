import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import NotificationActions from './notification.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';
 
function* getAllNotifications(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllNotifications, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationAllSuccess(response.data, response.headers));
  } else {
    yield put(NotificationActions.notificationAllFailure(response.data));
  }
}

 
 
export default {
  getAllNotifications, 
};
