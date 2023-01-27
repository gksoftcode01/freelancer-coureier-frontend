import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import UserActions from '../../../shared/reducers/user.reducer';

import AppUserActions from './app-user.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import AppUserDeleteModal from './app-user-delete-modal';
import styles from './app-user-styles';
import moment from 'moment/min/moment-with-locales';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
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
  ControlIcons,
} from '../../../shared/themes/FeedStyles';
function AppUserDetailScreen(props) {
  const { route, getUser, navigation, user, fetching, error,account  } = props;
   // prevents display of stale reducer data
  const entityId = user?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const whoView = route.params?.whoView;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
             getUser(routeEntityId);
     }, [routeEntityId, getUser, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the AppUser.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="appUserDetailScrollView">
        <Card key={user.id}>
        <PostText></PostText>
        <PostText>
         <Text style={styles.label}>{user.firstName} {user.lastName}</Text>
         </PostText>

    {whoView=="courier" &&(
      <PostText>
      <Text style={styles.label}>Clients rate:</Text>
      <UserRate>
                    <StarRating
                      rating={user?.avgRateCourier}
                      onChange={() => {
                        return null;
                      }}
                      starSize={18}
                    />
                    <Text style={styles.smallBlackLabel}>({user.totalRateCourier})</Text>
                  </UserRate>
      </PostText>
            )}

{whoView=="client"  &&(
      <PostText>
      <Text style={styles.label}>couriers rate:</Text>
      <UserRate>
                    <StarRating
                      rating={user?.avgRateClient}
                      onChange={() => {
                        return null;
                      }}
                      starSize={18}
                    />
                    <Text style={styles.smallBlackLabel}>({user.totalRateClient})</Text>
                  </UserRate>
      </PostText>
            )}


      {whoView=="client"  &&(
     <PostText> 
      <Text style={styles.label}>Mobile Number: </Text>
      <Text testID="gender">{user.mobileNumber}</Text>
      </PostText>
            )}

         <PostText>
         <Text style={styles.label}>Age: </Text>
         <Text >{moment().diff(user.birthDate, 'years',false) }</Text>
        </PostText>
   
    {/* <Text style={styles.label}>Id:</Text>
      <Text>{user.id}</Text> */}
     <PostText>
      {/* Gender Field */}
      <Text style={styles.label}>Gender: </Text>
      <Text testID="gender">{user.gender}</Text>
      </PostText>
      <PostText> 
      <Text style={styles.label}>Nationality: </Text>
      <Text testID="country">{String(user.country ? user.country.name : '')}</Text>
      </PostText>
 

 
      {/* RegisterDate Field */}
      <PostText>
      <Text style={styles.label}>Register Date: </Text>
      <Text testID="registerDate">{moment(new Date(user.registerDate)).fromNow()}</Text>
      </PostText>

   
      {/* PhoneNumber Field
      <Text style={styles.label}>PhoneNumber:</Text>
      <Text testID="phoneNumber">{appUser.phoneNumber}</Text> */}
      {/* MobileNumber Field */}
     
      {/* <Text style={styles.label}>State Province:</Text>
      <Text testID="stateProvince">{String(appUser.stateProvince ? appUser.stateProvince.name : '')}</Text>
      <Text style={styles.label}>City:</Text>
      <Text testID="city">{String(appUser.city ? appUser.city.name : '')}</Text> */}

   
      </Card>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.users.errorOne,
    fetching: state.users.fetchingOne,
    user: state.users.user ?? null,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => dispatch(UserActions.userRequest(id)),
 
 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUserDetailScreen);
