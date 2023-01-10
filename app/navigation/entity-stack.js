import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import StateProvinceScreen from '../modules/entities/state-province/state-province-screen';
import StateProvinceDetailScreen from '../modules/entities/state-province/state-province-detail-screen';
import StateProvinceEditScreen from '../modules/entities/state-province/state-province-edit-screen';
import CountryScreen from '../modules/entities/country/country-screen';
import CountryDetailScreen from '../modules/entities/country/country-detail-screen';
import CountryEditScreen from '../modules/entities/country/country-edit-screen';
import CityScreen from '../modules/entities/city/city-screen';
import CityDetailScreen from '../modules/entities/city/city-detail-screen';
import CityEditScreen from '../modules/entities/city/city-edit-screen';
import UserRateScreen from '../modules/entities/user-rate/user-rate-screen';
import UserRateDetailScreen from '../modules/entities/user-rate/user-rate-detail-screen';
import UserRateEditScreen from '../modules/entities/user-rate/user-rate-edit-screen';
import ItemTypesScreen from '../modules/entities/item-types/item-types-screen';
import ItemTypesDetailScreen from '../modules/entities/item-types/item-types-detail-screen';
import ItemTypesEditScreen from '../modules/entities/item-types/item-types-edit-screen';
import AppUserScreen from '../modules/entities/app-user/app-user-screen';
import AppUserDetailScreen from '../modules/entities/app-user/app-user-detail-screen';
import AppUserEditScreen from '../modules/entities/app-user/app-user-edit-screen';
import FlightScreen from '../modules/entities/flight/flight-screen';
import FlightDetailScreen from '../modules/entities/flight/flight-detail-screen';
import FlightEditScreen from '../modules/entities/flight/flight-edit-screen';
import CargoRequestStatusScreen from '../modules/entities/cargo-request-status/cargo-request-status-screen';
import CargoRequestStatusDetailScreen from '../modules/entities/cargo-request-status/cargo-request-status-detail-screen';
import CargoRequestStatusEditScreen from '../modules/entities/cargo-request-status/cargo-request-status-edit-screen';
import CargoRequestScreen from '../modules/entities/cargo-request/cargo-request-screen';
import CargoRequestDetailScreen from '../modules/entities/cargo-request/cargo-request-detail-screen';
import CargoRequestEditScreen from '../modules/entities/cargo-request/cargo-request-edit-screen';
import CargoRequestDetailsScreen from '../modules/entities/cargo-request-details/cargo-request-details-screen';
import CargoRequestDetailsDetailScreen from '../modules/entities/cargo-request-details/cargo-request-details-detail-screen';
import CargoRequestDetailsEditScreen from '../modules/entities/cargo-request-details/cargo-request-details-edit-screen';
import BidScreen from '../modules/entities/bid/bid-screen';
import BidDetailScreen from '../modules/entities/bid/bid-detail-screen';
import BidEditScreen from '../modules/entities/bid/bid-edit-screen';
import AskScreen from '../modules/entities/ask/ask-screen';
import AskDetailScreen from '../modules/entities/ask/ask-detail-screen';
import AskEditScreen from '../modules/entities/ask/ask-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'StateProvince',
    route: 'state-province',
    component: StateProvinceScreen,
    options: {
      title: 'StateProvinces',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('StateProvinceEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'StateProvinceDetail',
    route: 'state-province/detail',
    component: StateProvinceDetailScreen,
    options: { title: 'View StateProvince', headerLeft: () => <HeaderBackButton onPress={() => navigate('StateProvince')} /> },
  },
  {
    name: 'StateProvinceEdit',
    route: 'state-province/edit',
    component: StateProvinceEditScreen,
    options: {
      title: 'Edit StateProvince',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('StateProvinceDetail', 'StateProvince')} />,
    },
  },
  {
    name: 'Country',
    route: 'country',
    component: CountryScreen,
    options: {
      title: 'Countries',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CountryEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CountryDetail',
    route: 'country/detail',
    component: CountryDetailScreen,
    options: { title: 'View Country', headerLeft: () => <HeaderBackButton onPress={() => navigate('Country')} /> },
  },
  {
    name: 'CountryEdit',
    route: 'country/edit',
    component: CountryEditScreen,
    options: {
      title: 'Edit Country',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CountryDetail', 'Country')} />,
    },
  },
  {
    name: 'City',
    route: 'city',
    component: CityScreen,
    options: {
      title: 'Cities',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CityEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CityDetail',
    route: 'city/detail',
    component: CityDetailScreen,
    options: { title: 'View City', headerLeft: () => <HeaderBackButton onPress={() => navigate('City')} /> },
  },
  {
    name: 'CityEdit',
    route: 'city/edit',
    component: CityEditScreen,
    options: { title: 'Edit City', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CityDetail', 'City')} /> },
  },
  {
    name: 'UserRate',
    route: 'user-rate',
    component: UserRateScreen,
    options: {
      title: 'UserRates',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('UserRateEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'UserRateDetail',
    route: 'user-rate/detail',
    component: UserRateDetailScreen,
    options: { title: 'View UserRate', headerLeft: () => <HeaderBackButton onPress={() => navigate('UserRate')} /> },
  },
  {
    name: 'UserRateEdit',
    route: 'user-rate/edit',
    component: UserRateEditScreen,
    options: {
      title: 'Edit UserRate',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('UserRateDetail', 'UserRate')} />,
    },
  },
  {
    name: 'ItemTypes',
    route: 'item-types',
    component: ItemTypesScreen,
    options: {
      title: 'ItemTypes',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ItemTypesEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ItemTypesDetail',
    route: 'item-types/detail',
    component: ItemTypesDetailScreen,
    options: { title: 'View ItemTypes', headerLeft: () => <HeaderBackButton onPress={() => navigate('ItemTypes')} /> },
  },
  {
    name: 'ItemTypesEdit',
    route: 'item-types/edit',
    component: ItemTypesEditScreen,
    options: {
      title: 'Edit ItemTypes',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ItemTypesDetail', 'ItemTypes')} />,
    },
  },
  {
    name: 'AppUser',
    route: 'app-user',
    component: AppUserScreen,
    options: {
      title: 'AppUsers',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('AppUserEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'AppUserDetail',
    route: 'app-user/detail',
    component: AppUserDetailScreen,
    options: { title: 'View AppUser', headerLeft: () => <HeaderBackButton onPress={() => navigate('AppUser')} /> },
  },
  {
    name: 'AppUserEdit',
    route: 'app-user/edit',
    component: AppUserEditScreen,
    options: {
      title: 'Edit AppUser',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('AppUserDetail', 'AppUser')} />,
    },
  },
  {
    name: 'Flight',
    route: 'flight',
    component: FlightScreen,
    options: {
      title: 'Flights',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('FlightEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'FlightDetail',
    route: 'flight/detail',
    component: FlightDetailScreen,
    options: { title: 'View Flight', headerLeft: () => <HeaderBackButton onPress={() => navigate('Flight')} /> },
  },
  {
    name: 'FlightEdit',
    route: 'flight/edit',
    component: FlightEditScreen,
    options: {
      title: 'Edit Flight',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('FlightDetail', 'Flight')} />,
    },
  },
  {
    name: 'CargoRequestStatus',
    route: 'cargo-request-status',
    component: CargoRequestStatusScreen,
    options: {
      title: 'CargoRequestStatuses',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CargoRequestStatusEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CargoRequestStatusDetail',
    route: 'cargo-request-status/detail',
    component: CargoRequestStatusDetailScreen,
    options: { title: 'View CargoRequestStatus', headerLeft: () => <HeaderBackButton onPress={() => navigate('CargoRequestStatus')} /> },
  },
  {
    name: 'CargoRequestStatusEdit',
    route: 'cargo-request-status/edit',
    component: CargoRequestStatusEditScreen,
    options: {
      title: 'Edit CargoRequestStatus',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CargoRequestStatusDetail', 'CargoRequestStatus')} />,
    },
  },
  {
    name: 'CargoRequest',
    route: 'cargo-request',
    component: CargoRequestScreen,
    options: {
      title: 'CargoRequests',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CargoRequestEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CargoRequestDetail',
    route: 'cargo-request/detail',
    component: CargoRequestDetailScreen,
    options: { title: 'View CargoRequest', headerLeft: () => <HeaderBackButton onPress={() => navigate('CargoRequest')} /> },
  },
  {
    name: 'CargoRequestEdit',
    route: 'cargo-request/edit',
    component: CargoRequestEditScreen,
    options: {
      title: 'Edit CargoRequest',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CargoRequestDetail', 'CargoRequest')} />,
    },
  },
  {
    name: 'CargoRequestDetails',
    route: 'cargo-request-details',
    component: CargoRequestDetailsScreen,
    options: {
      title: 'CargoRequestDetails',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CargoRequestDetailsEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CargoRequestDetailsDetail',
    route: 'cargo-request-details/detail',
    component: CargoRequestDetailsDetailScreen,
    options: { title: 'View CargoRequestDetails', headerLeft: () => <HeaderBackButton onPress={() => navigate('CargoRequestDetails')} /> },
  },
  {
    name: 'CargoRequestDetailsEdit',
    route: 'cargo-request-details/edit',
    component: CargoRequestDetailsEditScreen,
    options: {
      title: 'Edit CargoRequestDetails',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CargoRequestDetailsDetail', 'CargoRequestDetails')} />,
    },
  },
  {
    name: 'Bid',
    route: 'bid',
    component: BidScreen,
    options: {
      title: 'Bids',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('BidEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'BidDetail',
    route: 'bid/detail',
    component: BidDetailScreen,
    options: { title: 'View Bid', headerLeft: () => <HeaderBackButton onPress={() => navigate('Bid')} /> },
  },
  {
    name: 'BidEdit',
    route: 'bid/edit',
    component: BidEditScreen,
    options: { title: 'Edit Bid', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('BidDetail', 'Bid')} /> },
  },
  {
    name: 'Ask',
    route: 'ask',
    component: AskScreen,
    options: {
      title: 'Asks',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('AskEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'AskDetail',
    route: 'ask/detail',
    component: AskDetailScreen,
    options: { title: 'View Ask', headerLeft: () => <HeaderBackButton onPress={() => navigate('Ask')} /> },
  },
  {
    name: 'AskEdit',
    route: 'ask/edit',
    component: AskEditScreen,
    options: { title: 'Edit Ask', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('AskDetail', 'Ask')} /> },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
