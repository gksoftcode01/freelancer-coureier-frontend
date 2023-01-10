export default {
  // Functions return fixtures

  // entity fixtures
  updateStateProvince: (stateProvince) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-state-province.json'),
    };
  },
  getAllStateProvinces: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-state-provinces.json'),
    };
  },
  getStateProvince: (stateProvinceId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-state-province.json'),
    };
  },
  deleteStateProvince: (stateProvinceId) => {
    return {
      ok: true,
    };
  },
  updateCountry: (country) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-country.json'),
    };
  },
  getAllCountries: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-countries.json'),
    };
  },
  getCountry: (countryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-country.json'),
    };
  },
  deleteCountry: (countryId) => {
    return {
      ok: true,
    };
  },
  updateCity: (city) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-city.json'),
    };
  },
  getAllCities: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-cities.json'),
    };
  },
  getCity: (cityId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-city.json'),
    };
  },
  deleteCity: (cityId) => {
    return {
      ok: true,
    };
  },
  updateUserRate: (userRate) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-user-rate.json'),
    };
  },
  getAllUserRates: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-user-rates.json'),
    };
  },
  getUserRate: (userRateId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-user-rate.json'),
    };
  },
  deleteUserRate: (userRateId) => {
    return {
      ok: true,
    };
  },
  updateItemTypes: (itemTypes) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-item-types.json'),
    };
  },
  getAllItemTypes: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-item-types.json'),
    };
  },
  getItemTypes: (itemTypesId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-item-types.json'),
    };
  },
  deleteItemTypes: (itemTypesId) => {
    return {
      ok: true,
    };
  },
  updateAppUser: (appUser) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-app-user.json'),
    };
  },
  getAllAppUsers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-app-users.json'),
    };
  },
  getAppUser: (appUserId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-app-user.json'),
    };
  },
  deleteAppUser: (appUserId) => {
    return {
      ok: true,
    };
  },
  updateFlight: (flight) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-flight.json'),
    };
  },
  getAllFlights: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-flights.json'),
    };
  },
  getFlight: (flightId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-flight.json'),
    };
  },
  deleteFlight: (flightId) => {
    return {
      ok: true,
    };
  },
  updateCargoRequestStatus: (cargoRequestStatus) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-cargo-request-status.json'),
    };
  },
  getAllCargoRequestStatuses: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-cargo-request-statuses.json'),
    };
  },
  getCargoRequestStatus: (cargoRequestStatusId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-cargo-request-status.json'),
    };
  },
  deleteCargoRequestStatus: (cargoRequestStatusId) => {
    return {
      ok: true,
    };
  },
  updateCargoRequest: (cargoRequest) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-cargo-request.json'),
    };
  },
  getAllCargoRequests: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-cargo-requests.json'),
    };
  },
  getCargoRequest: (cargoRequestId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-cargo-request.json'),
    };
  },
  deleteCargoRequest: (cargoRequestId) => {
    return {
      ok: true,
    };
  },
  updateCargoRequestDetails: (cargoRequestDetails) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-cargo-request-details.json'),
    };
  },
  getAllCargoRequestDetails: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-cargo-request-details.json'),
    };
  },
  getCargoRequestDetails: (cargoRequestDetailsId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-cargo-request-details.json'),
    };
  },
  deleteCargoRequestDetails: (cargoRequestDetailsId) => {
    return {
      ok: true,
    };
  },
  updateBid: (bid) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-bid.json'),
    };
  },
  getAllBids: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-bids.json'),
    };
  },
  getBid: (bidId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-bid.json'),
    };
  },
  deleteBid: (bidId) => {
    return {
      ok: true,
    };
  },
  updateAsk: (ask) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-ask.json'),
    };
  },
  getAllAsks: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-asks.json'),
    };
  },
  getAsk: (askId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-ask.json'),
    };
  },
  deleteAsk: (askId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
