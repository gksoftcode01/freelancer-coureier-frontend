import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

 import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens

import HomeScreen from '../modules/home/home-screen';
import LoginScreen from '../modules/login/login-screen';
import SettingsScreen from '../modules/account/settings/settings-screen';
import RegisterScreen from '../modules/account/register/register-screen';
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen';
import ChangePasswordScreen from '../modules/account/password/change-password-screen';
import AccountActions from '../shared/reducers/account.reducer';
import EntityStackScreen, { getEntityRoutes ,flightStack,cargoStack} from './entity-stack';
import StorybookScreen from '../../storybook';
import ChatScreen from '../modules/chat/chat-screen';
import DrawerContent from './drawer/drawer-content';
import { isReadyRef, navigationRef,userDetailsBack } from './nav-ref';
import NotFound from './not-found-screen';
import { ModalScreen } from './modal-screen';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import AppUserDetailScreen from '../modules/entities/app-user/app-user-detail-screen'
 import colors from '../shared/themes/colors';

export const homeScreens = [
    {
      name: 'Home',
      component: HomeScreen,
      auth: null,
    },
    {
      name: 'Login',
      route: 'login',
      component: LoginScreen,
      auth: false,
    },
    {
      name: 'AppUserDetail',
      route: 'AppUserDetail',
      component: AppUserDetailScreen,
      auth: true,
      options: {
        title: 'User details',
        headerLeft: () => <HeaderBackButton color={colors.myPurple}  onPress={() =>  userDetailsBack() }/>,
      },
    },
    {
      name: 'Settings',
      route: 'settings',
      component: SettingsScreen,
      auth: true,
    },
    {
      name: 'Register',
      route: 'register',
      component: RegisterScreen,
      auth: false,
    },
    {
      name: 'Forgot Password',
      route: 'reset-password',
      component: ForgotPasswordScreen,
      auth: false,
    },
    {
      name: 'Change Password',
      route: 'change-password',
      component: ChangePasswordScreen,
      auth: true,
    },
  
    {
      name: 'Chat',
      route: 'chat',
      component: ChatScreen,
      auth: true,
    },
  ];

  if (__DEV__) {
    homeScreens.push({
      name: 'Storybook',
      route: 'storybook',
      component: StorybookScreen,
      auth: false,
    });
  }
  export const getHomeRoutes = () => {
    const routes = {};
    homeScreens.forEach((screen) => {
      if (screen.route) {
        routes[screen.name] = screen.route;
      }
    });
    return routes;
  };

  const HomeStack = createStackNavigator();

  export const homeStack = ({navigation}) => (
    <HomeStack.Navigator>
        {homeScreens.map((screen, index) => {
          return <HomeStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
        })}
      </HomeStack.Navigator>
  );
  