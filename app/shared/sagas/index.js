import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { RegisterTypes } from '../../modules/account/register/register.reducer';
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer';
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { StateProvinceTypes } from '../../modules/entities/state-province/state-province.reducer';
import { CountryTypes } from '../../modules/entities/country/country.reducer';
import { CityTypes } from '../../modules/entities/city/city.reducer';
import { UserRateTypes } from '../../modules/entities/user-rate/user-rate.reducer';
import { ItemTypesTypes } from '../../modules/entities/item-types/item-types.reducer';
import { AppUserTypes } from '../../modules/entities/app-user/app-user.reducer';
import { FlightTypes } from '../../modules/entities/flight/flight.reducer';
import { NotificationTypes } from '../../modules/entities/notification/notification.reducer';
import { CargoRequestStatusTypes } from '../../modules/entities/cargo-request-status/cargo-request-status.reducer';
import { CargoRequestTypes } from '../../modules/entities/cargo-request/cargo-request.reducer';
import { CargoRequestDetailsTypes } from '../../modules/entities/cargo-request-details/cargo-request-details.reducer';
import { BidTypes } from '../../modules/entities/bid/bid.reducer';
import { AskTypes } from '../../modules/entities/ask/ask.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad} from '../../modules/login/login.sagas';
import { register } from '../../modules/account/register/register.sagas';
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas';
import { changePassword } from '../../modules/account/password/change-password.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import StateProvinceSagas from '../../modules/entities/state-province/state-province.sagas';
import CountrySagas from '../../modules/entities/country/country.sagas';
import CitySagas from '../../modules/entities/city/city.sagas';
import UserRateSagas from '../../modules/entities/user-rate/user-rate.sagas';
import ItemTypesSagas from '../../modules/entities/item-types/item-types.sagas';
import AppUserSagas from '../../modules/entities/app-user/app-user.sagas';
import FlightSagas from '../../modules/entities/flight/flight.sagas';
import NotificatonSagas from '../../modules/entities/notification/notification.sagas';
import CargoRequestStatusSagas from '../../modules/entities/cargo-request-status/cargo-request-status.sagas';
import CargoRequestSagas from '../../modules/entities/cargo-request/cargo-request.sagas';
import CargoRequestDetailsSagas from '../../modules/entities/cargo-request-details/cargo-request-details.sagas';
import BidSagas from '../../modules/entities/bid/bid.sagas';
import AskSagas from '../../modules/entities/ask/ask.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    // takeLatest(LoginTypes.LOGIN_REQUEST, generateOTP, api),
    // takeLatest(LoginTypes.LOGIN_REQUEST, loginOtp, api),

    takeLatest(StateProvinceTypes.STATE_PROVINCE_REQUEST, StateProvinceSagas.getStateProvince, api),
    takeLatest(StateProvinceTypes.STATE_PROVINCE_ALL_REQUEST, StateProvinceSagas.getAllStateProvinces, api),
     takeLatest(StateProvinceTypes.STATE_PROVINCE_UPDATE_REQUEST, StateProvinceSagas.updateStateProvince, api),
    takeLatest(StateProvinceTypes.STATE_PROVINCE_DELETE_REQUEST, StateProvinceSagas.deleteStateProvince, api),

    takeLatest(CountryTypes.COUNTRY_REQUEST, CountrySagas.getCountry, api),
    takeLatest(CountryTypes.COUNTRY_ALL_REQUEST, CountrySagas.getAllCountries, api),
    takeLatest(CountryTypes.COUNTRY_UPDATE_REQUEST, CountrySagas.updateCountry, api),
    takeLatest(CountryTypes.COUNTRY_DELETE_REQUEST, CountrySagas.deleteCountry, api),

    takeLatest(CityTypes.CITY_REQUEST, CitySagas.getCity, api),
    takeLatest(CityTypes.CITY_ALL_REQUEST, CitySagas.getAllCities, api),
    takeLatest(CityTypes.CITY_UPDATE_REQUEST, CitySagas.updateCity, api),
    takeLatest(CityTypes.CITY_DELETE_REQUEST, CitySagas.deleteCity, api),

    takeLatest(UserRateTypes.USER_RATE_REQUEST, UserRateSagas.getUserRate, api),
    takeLatest(UserRateTypes.USER_RATE_ALL_REQUEST, UserRateSagas.getAllUserRates, api),
    takeLatest(UserRateTypes.USER_RATE_UPDATE_REQUEST, UserRateSagas.updateUserRate, api),
    takeLatest(UserRateTypes.USER_RATE_DELETE_REQUEST, UserRateSagas.deleteUserRate, api),

    takeLatest(ItemTypesTypes.ITEM_TYPES_REQUEST, ItemTypesSagas.getItemTypes, api),
    takeLatest(ItemTypesTypes.ITEM_TYPES_ALL_REQUEST, ItemTypesSagas.getAllItemTypes, api),
    takeLatest(ItemTypesTypes.ITEM_TYPES_UPDATE_REQUEST, ItemTypesSagas.updateItemTypes, api),
    takeLatest(ItemTypesTypes.ITEM_TYPES_DELETE_REQUEST, ItemTypesSagas.deleteItemTypes, api),

    takeLatest(AppUserTypes.APP_USER_REQUEST, AppUserSagas.getAppUser, api),
    takeLatest(AppUserTypes.APP_USER_ALL_REQUEST, AppUserSagas.getAllAppUsers, api),
    takeLatest(AppUserTypes.APP_USER_UPDATE_REQUEST, AppUserSagas.updateAppUser, api),
    takeLatest(AppUserTypes.APP_USER_DELETE_REQUEST, AppUserSagas.deleteAppUser, api),

     takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, NotificatonSagas.getAllNotifications, api),
 
    
    takeLatest(FlightTypes.FLIGHT_REQUEST, FlightSagas.getFlight, api),
    takeLatest(FlightTypes.FLIGHT_ALL_REQUEST, FlightSagas.getAllFlights, api),
    takeLatest(FlightTypes.FLIGHT_UPDATE_REQUEST, FlightSagas.updateFlight, api),
    takeLatest(FlightTypes.FLIGHT_DELETE_REQUEST, FlightSagas.deleteFlight, api),

    takeLatest(CargoRequestStatusTypes.CARGO_REQUEST_STATUS_REQUEST, CargoRequestStatusSagas.getCargoRequestStatus, api),
    takeLatest(CargoRequestStatusTypes.CARGO_REQUEST_STATUS_ALL_REQUEST, CargoRequestStatusSagas.getAllCargoRequestStatuses, api),
    takeLatest(CargoRequestStatusTypes.CARGO_REQUEST_STATUS_UPDATE_REQUEST, CargoRequestStatusSagas.updateCargoRequestStatus, api),
    takeLatest(CargoRequestStatusTypes.CARGO_REQUEST_STATUS_DELETE_REQUEST, CargoRequestStatusSagas.deleteCargoRequestStatus, api),

    takeLatest(CargoRequestTypes.CARGO_REQUEST_REQUEST, CargoRequestSagas.getCargoRequest, api),
    takeLatest(CargoRequestTypes.CARGO_REQUEST_ALL_REQUEST, CargoRequestSagas.getAllCargoRequests, api),
    takeLatest(CargoRequestTypes.CARGO_REQUEST_UPDATE_REQUEST, CargoRequestSagas.updateCargoRequest, api),
    takeLatest(CargoRequestTypes.CARGO_REQUEST_DELETE_REQUEST, CargoRequestSagas.deleteCargoRequest, api),

    takeLatest(CargoRequestDetailsTypes.CARGO_REQUEST_DETAILS_REQUEST, CargoRequestDetailsSagas.getCargoRequestDetails, api),
    takeLatest(CargoRequestDetailsTypes.CARGO_REQUEST_DETAILS_ALL_REQUEST, CargoRequestDetailsSagas.getAllCargoRequestDetails, api),
    takeLatest(CargoRequestDetailsTypes.CARGO_REQUEST_DETAILS_UPDATE_REQUEST, CargoRequestDetailsSagas.updateCargoRequestDetails, api),
    takeLatest(CargoRequestDetailsTypes.CARGO_REQUEST_DETAILS_DELETE_REQUEST, CargoRequestDetailsSagas.deleteCargoRequestDetails, api),

    takeLatest(BidTypes.BID_REQUEST, BidSagas.getBid, api),
    takeLatest(BidTypes.BID_ALL_REQUEST, BidSagas.getAllBids, api),
    takeLatest(BidTypes.BID_UPDATE_REQUEST, BidSagas.updateBid, api),
    takeLatest(BidTypes.BID_DELETE_REQUEST, BidSagas.deleteBid, api),

    takeLatest(AskTypes.ASK_REQUEST, AskSagas.getAsk, api),
    takeLatest(AskTypes.ASK_ALL_REQUEST, AskSagas.getAllAsks, api),
    takeLatest(AskTypes.ASK_UPDATE_REQUEST, AskSagas.updateAsk, api),
    takeLatest(AskTypes.ASK_DELETE_REQUEST, AskSagas.deleteAsk, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
