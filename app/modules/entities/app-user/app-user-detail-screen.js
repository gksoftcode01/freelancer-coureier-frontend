import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import AppUserActions from './app-user.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import AppUserDeleteModal from './app-user-delete-modal';
import styles from './app-user-styles';

function AppUserDetailScreen(props) {
  const { route, getAppUser, navigation, appUser, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = appUser?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('AppUser');
      } else {
        setDeleteModalVisible(false);
        getAppUser(routeEntityId);
      }
    }, [routeEntityId, getAppUser, navigation]),
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
      <Text style={styles.label}>Id:</Text>
      <Text>{appUser.id}</Text>
      {/* BirthDate Field */}
      <Text style={styles.label}>BirthDate:</Text>
      <Text testID="birthDate">{String(appUser.birthDate)}</Text>
      {/* Gender Field */}
      <Text style={styles.label}>Gender:</Text>
      <Text testID="gender">{appUser.gender}</Text>
      {/* RegisterDate Field */}
      <Text style={styles.label}>RegisterDate:</Text>
      <Text testID="registerDate">{String(appUser.registerDate)}</Text>
      {/* PhoneNumber Field */}
      <Text style={styles.label}>PhoneNumber:</Text>
      <Text testID="phoneNumber">{appUser.phoneNumber}</Text>
      {/* MobileNumber Field */}
      <Text style={styles.label}>MobileNumber:</Text>
      <Text testID="mobileNumber">{appUser.mobileNumber}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(appUser.user ? appUser.user.id : '')}</Text>
      <Text style={styles.label}>Country:</Text>
      <Text testID="country">{String(appUser.country ? appUser.country.name : '')}</Text>
      <Text style={styles.label}>State Province:</Text>
      <Text testID="stateProvince">{String(appUser.stateProvince ? appUser.stateProvince.name : '')}</Text>
      <Text style={styles.label}>City:</Text>
      <Text testID="city">{String(appUser.city ? appUser.city.name : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('AppUserEdit', { entityId })}
          accessibilityLabel={'AppUser Edit Button'}
          testID="appUserEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'AppUser Delete Button'}
          testID="appUserDeleteButton"
        />
        {deleteModalVisible && (
          <AppUserDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={appUser}
            testID="appUserDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    appUser: state.appUsers.appUser,
    error: state.appUsers.errorOne,
    fetching: state.appUsers.fetchingOne,
    deleting: state.appUsers.deleting,
    errorDeleting: state.appUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppUser: (id) => dispatch(AppUserActions.appUserRequest(id)),
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
    deleteAppUser: (id) => dispatch(AppUserActions.appUserDeleteRequest(id)),
    resetAppUsers: () => dispatch(AppUserActions.appUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUserDetailScreen);
