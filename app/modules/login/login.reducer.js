import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
 // generateOtp : ['options'],
 //  loginOtp : ['options'],
  loginSuccess: ['authToken', 'idToken'],
 // loginOtpSuccess: ['authToken', 'idToken'],
  //generateOtpSuccess :null,
 // generateOtpFailure :null,
  loginFailure: ['error'],
  logoutRequest: null,
  logoutSuccess: null,
   loginLoad: [],
  loginLoadSuccess: [],
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  authToken: null,
  idToken: null,
  error: null,
  fetching: false,
  loading: false,
  //generateOtpSuccess: false
});

/* ------------- Reducers ------------- */
// we're attempting to login
// export const requestOtp = (state) => state.merge({ fetching: true, error: null });

// export const requestOtpSuccess = (state) => {
//   return state.merge({ fetching: false, error: null, generateOtpSuccess:true   });
// };
 
// export const requestOtpFailure = (state, { error }) => state.merge({ fetching: false, error, authToken: null, generateOtpSuccess:false });

// we're attempting to login
export const request = (state) => state.merge({ fetching: true, error: null });

// we've successfully logged in
export const success = (state, data) => {
  const { authToken, idToken } = data;
  return state.merge({ fetching: false, error: null, authToken, idToken });
};

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, authToken: null });

// we're attempting to load token from startup sagas
export const load = (state) => state.merge({ loading: true });

export const loadSuccess = (state) => state.merge({ loading: false });

// we need to logout, meaning clear access tokens and account
export const logoutRequest = (state) => state;

// we've logged out
export const logoutSuccess = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_LOAD]: load,
  [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,
  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
 // [Types.GENERATE_OTP]: requestOtp,
  // [Types.LOGIN_OTP]: request,
  // [Types.LOGIN_OTP_SUCCESS]: success,
  // [Types.GENERATE_OTP_SUCCESS]: requestOtpSuccess,
  // [Types.GENERATE_OTP_FAILURE]: requestOtpFailure,
 
 });

/* ------------- Selectors ------------- */
