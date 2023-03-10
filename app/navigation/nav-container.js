import    React , { createContext }  from 'react';
import { AppState, Text, useWindowDimensions, View } from 'react-native';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
 import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';
import { connect } from 'react-redux';
 import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
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
import { isReadyRef, navigate, navigationRef } from './nav-ref';
import NotFound from './not-found-screen';
import { FilterScreen } from './FilterScreen';
import { DrawerButton } from './drawer/drawer-button';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { homeStack} from './home-stack';
import colors from '../shared/themes/colors'
import NotificationScreen from '../modules/entities/notification/notifications-screen';
import WebsocketService from '../shared/websockets/websocket.service';
import { getLogin } from '../shared/reducers/account.reducer';
import ChatActions from '../modules/chat/chat.reducer';
import { Notifier, Easing } from 'react-native-notifier';


const linking = {
  prefixes: ['rnapp://', Linking.makeUrl('/')],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: 'Home/*',
      Flights: 'Flights/*',
      Cargo :'Cargo/*',
      FilterScreen: 'alert',
      NotFound: '*',
    },
  },
};
export const chatScreens = [
{
  name: 'Chat',
  route: 'chat',
  component: ChatScreen,
  auth: true,
},]
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
 


const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'Chat') {
    return false;
  }
  return true;
};
const getScreens = (props) => {
  const isAuthed = props.account !== null;
  return drawerScreens.map((screen, index) => {
    if (screen.auth === null || screen.auth === undefined) {
      return <Drawer.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />;
    } else if (screen.auth === isAuthed) {
      return <Drawer.Screen name={screen.name} component={screen.component} options={screen.options} key={index} />;
    }
    return null;
  });
};

function NavContainer(props) {
  const { loaded, getAccount , username, chat } = props;
  const lastAppState = 'active';
 
  React.useEffect(()=>{
    if(chat)
      if(chat.length > 0){
        Notifier.showNotification({
        title: 'Notification',
        description: 'You have got a new Notification!',
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
         onPress: () => navigationRef.current.navigate('Notification'),
        hideOnPress: true,
      });
    }
  },[chat]);

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  React.useEffect(() => {
    const handleChange = (nextAppState) => {
      if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
        getAccount();
      }
    };
    AppState.addEventListener('change', handleChange);
    return () => AppState.removeEventListener('change', handleChange);
  }, [getAccount]);

  useReduxDevToolsExtension(navigationRef);

  const dimensions = useWindowDimensions();
 // const scheme = useColorScheme();

;
  return !loaded ? (
    
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (

    <NavigationContainer /*theme={scheme === 'dark' ? DarkTheme : DefaultTheme}*/
       ref={navigationRef}
     
      onReady={() => {
        isReadyRef.current = true;
      }}>
          <Tab.Navigator
           initialRouteName="Home"
           firstRoute ="Home"
           
    screenOptions={{
      activeTintColor: colors.myPurple,
          }}>

    <Tab.Screen
      name="Flights"
      component={flightStack}
      options={({route}) => ({
        auth: true,
        tabBarLabel: 'Available couriers',
        tabBarVisible: getTabBarVisibility(route), 
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <Ionicons
            name="airplane-outline"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Home"
      component={homeStack}
      options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }}
    />
      <Tab.Screen
      name="Cargo"
      component={cargoStack}
      options={{
        auth: true,
         tabBarLabel: 'Courier requests',
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <Ionicons name="briefcase" color={color} size={size} />
        ),
      }}
    />
       <Tab.Screen
      name="Notification"
      component={NotificationScreen}
       options={{
        auth: true,
         tabBarLabel: 'Notification',
        headerShown: false,
        tabBarIcon: ({color, size}) => (
          <Ionicons name="notifications" color={color} size={size} />
        ),
      }}
    />
    {/* <Tab.Screen
          name="FilterScreen"
          component={FilterScreen}
          title="modal"
          options={{
            tabBarIcon:({color, size}) => (<></>),
            tabBarButton: () => null,
            tabBarLabel:"",
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        /> */}
      <Tab.Screen name="NotFound" component={NotFound} options={{    tabBarButton: () => null,title: 'Oops!' }} />

  </Tab.Navigator>

      {/* <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            
             <Drawer.Navigator
               drawerContent={(p) => <DrawerContent {...p} />}
               initialRouteName={drawerScreens[0].name}
               drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
               screenOptions={{ headerShown: true, headerLeft: DrawerButton }}>
               {getScreens(props)}
             </Drawer.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="ModalScreen"
          component={ModalScreen}
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
        />
        <Stack.Screen name="NotFound" component={NotFound} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
      */}
    
    </NavigationContainer>
    ) ;
  
}

const mapStateToProps = (state) => {
  return {
    loaded: state.appState.rehydrationComplete,
    account: state.account.account,
    chat: state.chat.chat,
    username: getLogin(state.account),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAccount: () => dispatch(AccountActions.accountRequest()),
    resetChat: dispatch(ChatActions.chatReset()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
