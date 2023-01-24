// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  const login = (userAuth) => api.post('api/authenticate', userAuth);
  const register = (user) => api.post('api/register', user);
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    });

  const getAccount = () => api.get('api/account');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    );
 
  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/users/' + userId);

  const getStateProvince = (stateProvinceId) => api.get('api/state-provinces/' + stateProvinceId);
  const getAllStateProvinces = (options) => api.get('api/state-provinces', options);
  const createStateProvince = (stateProvince) => api.post('api/state-provinces', stateProvince);
  const updateStateProvince = (stateProvince) => api.put(`api/state-provinces/${stateProvince.id}`, stateProvince);
  const deleteStateProvince = (stateProvinceId) => api.delete('api/state-provinces/' + stateProvinceId);

  const getCountry = (countryId) => api.get('api/countries/' + countryId);
  const getAllCountries = (options) => api.get('api/countries', options);
  const createCountry = (country) => api.post('api/countries', country);
  const updateCountry = (country) => api.put(`api/countries/${country.id}`, country);
  const deleteCountry = (countryId) => api.delete('api/countries/' + countryId);

  const getCity = (cityId) => api.get('api/cities/' + cityId);
  const getAllCities = (options) => api.get('api/cities', options);
  const createCity = (city) => api.post('api/cities', city);
  const updateCity = (city) => api.put(`api/cities/${city.id}`, city);
  const deleteCity = (cityId) => api.delete('api/cities/' + cityId);
 
  const getUserRate = (userRateId) => api.get('api/user-rates/' + userRateId);
  const getUserRateCargo = (cargoReqId) => api.get('api/user-rates-cargo/' + cargoReqId);
  const getAllUserRates = (options) => api.get('api/user-rates', options);
  const createUserRate = (userRate) => api.post('api/user-rates', userRate);
  const updateUserRate = (userRate) => api.put(`api/user-rates/${userRate.id}`, userRate);
  const deleteUserRate = (userRateId) => api.delete('api/user-rates/' + userRateId);

  const getItemTypes = (itemTypesId) => api.get('api/item-types/' + itemTypesId);
  const getAllItemTypes = (options) => api.get('api/item-types', options);
  const createItemTypes = (itemTypes) => api.post('api/item-types', itemTypes);
  const updateItemTypes = (itemTypes) => api.put(`api/item-types/${itemTypes.id}`, itemTypes);
  const deleteItemTypes = (itemTypesId) => api.delete('api/item-types/' + itemTypesId);

  const getAppUser = (appUserId) => api.get('api/app-users/' + appUserId);
  const getAllAppUsers = (options) => api.get('api/app-users', options);
  const createAppUser = (appUser) => api.post('api/app-users', appUser);
  const updateAppUser = (appUser) => api.put(`api/app-users/${appUser.id}`, appUser);
  const deleteAppUser = (appUserId) => api.delete('api/app-users/' + appUserId);

  const getFlight = (flightId) => api.get('api/flights/' + flightId);
  const getAllFlights = (options) => api.get('api/flights', options);
  const createFlight = (flight) => api.post('api/flights', flight);
  const updateFlight = (flight) => api.put(`api/flights/${flight.id}`, flight);
  const deleteFlight = (flightId) => api.delete('api/flights/' + flightId);

  const getCargoRequestStatus = (cargoRequestStatusId) => api.get('api/cargo-request-statuses/' + cargoRequestStatusId);
  const getAllCargoRequestStatuses = (options) => api.get('api/cargo-request-statuses', options);
  const createCargoRequestStatus = (cargoRequestStatus) => api.post('api/cargo-request-statuses', cargoRequestStatus);
  const updateCargoRequestStatus = (cargoRequestStatus) =>
    api.put(`api/cargo-request-statuses/${cargoRequestStatus.id}`, cargoRequestStatus);
  const deleteCargoRequestStatus = (cargoRequestStatusId) => api.delete('api/cargo-request-statuses/' + cargoRequestStatusId);

  const getCargoRequest = (cargoRequestId) => api.get('api/cargo-requests/' + cargoRequestId);
  const getAllCargoRequests = (options) => api.get('api/cargo-requests', options);
  const createCargoRequest = (cargoRequest) => api.post('api/cargo-requests', cargoRequest);
  const updateCargoRequest = (cargoRequest) => api.put(`api/cargo-requests/${cargoRequest.id}`, cargoRequest);
  const deleteCargoRequest = (cargoRequestId) => api.delete('api/cargo-requests/' + cargoRequestId);

  const getCargoRequestDetails = (cargoRequestDetailsId) => api.get('api/cargo-request-details/' + cargoRequestDetailsId);
  const getAllCargoRequestDetails = (options) => api.get('api/cargo-request-details', options);
  const createCargoRequestDetails = (cargoRequestDetails) => api.post('api/cargo-request-details', cargoRequestDetails);
  const updateCargoRequestDetails = (cargoRequestDetails) =>
    api.put(`api/cargo-request-details/${cargoRequestDetails.id}`, cargoRequestDetails);
  const deleteCargoRequestDetails = (cargoRequestDetailsId) => api.delete('api/cargo-request-details/' + cargoRequestDetailsId);

  const getBid = (bidId) => api.get('api/bids/' + bidId);
  const getAllBids = (options) => api.get('api/bids', options);
  const createBid = (bid) => api.post('api/bids', bid);
  const updateBid = (bid) => api.put(`api/bids/${bid.id}`, bid);
  const deleteBid = (bidId) => api.delete('api/bids/' + bidId);

  const getAsk = (askId) => api.get('api/asks/' + askId);
  const getAllAsks = (options) => api.get('api/asks', options);
  const createAsk = (ask) => api.post('api/asks', ask);
  const updateAsk = (ask) => api.put(`api/asks/${ask.id}`, ask);
  const deleteAsk = (askId) => api.delete('api/asks/' + askId);
  // jhipster-react-native-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,

    createStateProvince,
    updateStateProvince,
    getAllStateProvinces,
    getStateProvince,
    deleteStateProvince,

    createCountry,
    updateCountry,
    getAllCountries,
    getCountry,
    deleteCountry,

    createCity,
    updateCity,
    getAllCities,
    getCity,
    deleteCity,

    createUserRate,
    updateUserRate,
    getAllUserRates,
    getUserRate,
    deleteUserRate,
    getUserRateCargo,
    
    createItemTypes,
    updateItemTypes,
    getAllItemTypes,
    getItemTypes,
    deleteItemTypes,

    createAppUser,
    updateAppUser,
    getAllAppUsers,
    getAppUser,
    deleteAppUser,

    createFlight,
    updateFlight,
    getAllFlights,
    getFlight,
    deleteFlight,

    createCargoRequestStatus,
    updateCargoRequestStatus,
    getAllCargoRequestStatuses,
    getCargoRequestStatus,
    deleteCargoRequestStatus,

    createCargoRequest,
    updateCargoRequest,
    getAllCargoRequests,
    getCargoRequest,
    deleteCargoRequest,

    createCargoRequestDetails,
    updateCargoRequestDetails,
    getAllCargoRequestDetails,
    getCargoRequestDetails,
    deleteCargoRequestDetails,

    createBid,
    updateBid,
    getAllBids,
    getBid,
    deleteBid,

    createAsk,
    updateAsk,
    getAllAsks,
    getAsk,
    deleteAsk,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
