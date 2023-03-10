import React from 'react';
import { ScrollView, Text, Image, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import LearnMoreLinks from './learn-more-links.component.js';
import { Images } from '../../shared/themes';
import styles from './home-screen.styles';
import RoundedButton from '../../shared/components/rounded-button/rounded-button';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import LoginActions from '../../modules/login/login.reducer';
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
  UserRate,
  itemType,
} from '../../shared/themes/FeedStyles';
import colors from '../../shared/themes/colors.js';

function HomeScreen(props) {
  const { navigation , account ,logout} = props;
  
  return (
    <View style={[styles.container, styles.mainContainer]} testID="homeScreen">
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <Card> 
        <View style={styles.centered}>
          <Image source={Images.logoJhipster} style={styles.logo} />
         </View>
        {account && account.login ? (
          <View style={[styles.authContainer, styles.authContainerTrue]} testID="authDisplayTrue">
            <Text style={styles.authText}>
              <Ionicons name="md-checkmark-circle" size={22} color={colors.myPurple} /> You are signed in as {account.login}
            </Text>
            <RoundedButton text="Profile" onPress={() => navigation.navigate('Settings')}   />
            {/* <RoundedButton text="My Flights" onPress={() => navigation.navigate('Flight')}   />
            <RoundedButton text="My Courier Requests" onPress={() => navigation.navigate('Cargo')}   /> */}
            {  <RoundedButton text="logout" onPress={() => logout()}   />  }
            {/* <RoundedButton text="Change password" onPress={() => navigation.navigate('Change Password')}   /> */}
            {/* <RoundedButton text="New account" onPress={() => navigation.navigate('PhoneNumber')}   /> */}
           </View>
        ) : (
          <View style={[styles.authContainer, styles.authContainerFalse]} testID="authDisplayFalse">
            <Text style={styles.authText}>
              <Ionicons name="md-information-circle" size={22} color={'white'} /> You are not signed in.
            </Text>
            <RoundedButton text="Login" onPress={() => navigation.navigate('LoginScreen')}   />
            {/* <RoundedButton text="Forgot Password" onPress={() => navigation.navigate('Forgot Password')}   />
            <RoundedButton text="Register" onPress={() => navigation.navigate('Register')}   /> */}
            {/* <RoundedButton text="SignIn" onPress={() => navigation.navigate('PhoneNumber')}   /> */}
          </View>
        )}
        <View style={styles.hairline} />
        {/* <Header /> */}
        {global.HermesInternal == null ? null : (
          <View style={styles.engine}>
            <Text style={styles.footer}>Engine: Hermes</Text>
          </View>
        )}
        {/* <View style={styles.body}>
          {Platform.OS !== 'android' ? null : (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Running on Android</Text>
              <Text style={styles.sectionDescription}>
                Run <Text style={styles.highlight}>adb reverse tcp:8080 tcp:8080</Text> to be able to connect to your JHipster backend
                (Android only).
              </Text>
            </View>
          )}
        
      
        </View> */}
        </Card>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({ account: state.account.account });
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(LoginActions.logoutRequest()),

});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
