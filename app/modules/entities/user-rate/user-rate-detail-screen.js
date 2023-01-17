import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import UserRateActions from './user-rate.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import UserRateDeleteModal from './user-rate-delete-modal';
import styles from './user-rate-styles';

function UserRateDetailScreen(props) {
  const { route, getUserRate, navigation, userRate, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = userRate?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('UserRate');
      } else {
        setDeleteModalVisible(false);
        getUserRate(routeEntityId);
      }
    }, [routeEntityId, getUserRate, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the UserRate.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="userRateDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{userRate.id}</Text>
      {/* Rate Field */}
      <Text style={styles.label}>Rate:</Text>
      <Text testID="rate">{userRate.rate}</Text>
      {/* Note Field */}
      <Text style={styles.label}>Note:</Text>
      <Text testID="note">{userRate.note}</Text>
      {/* RateDate Field */}
      <Text style={styles.label}>RateDate:</Text>
      <Text testID="rateDate">{String(userRate.rateDate)}</Text>
      <Text style={styles.label}>Cargo Request:</Text>
      <Text testID="cargoRequest">{String(userRate.cargoRequest ? userRate.cargoRequest.id : '')}</Text>
      <Text style={styles.label}>App User:</Text>
      <Text testID="appUser">{String(userRate.appUser ? userRate.appUser.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('UserRateEdit', { entityId })}
          accessibilityLabel={'UserRate Edit Button'}
          testID="userRateEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'UserRate Delete Button'}
          testID="userRateDeleteButton"
        />
        {deleteModalVisible && (
          <UserRateDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={userRate}
            testID="userRateDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    userRate: state.userRates.userRate,
    error: state.userRates.errorOne,
    fetching: state.userRates.fetchingOne,
    deleting: state.userRates.deleting,
    errorDeleting: state.userRates.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserRate: (options) => dispatch(UserRateActions.userRateRequest(options)),
    getAllUserRates: (options) => dispatch(UserRateActions.userRateAllRequest(options)),
    deleteUserRate: (id) => dispatch(UserRateActions.userRateDeleteRequest(id)),
    resetUserRates: () => dispatch(UserRateActions.userRateReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRateDetailScreen);
