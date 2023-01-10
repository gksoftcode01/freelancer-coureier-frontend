import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CargoRequestStatusActions from './cargo-request-status.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CargoRequestStatusDeleteModal from './cargo-request-status-delete-modal';
import styles from './cargo-request-status-styles';

function CargoRequestStatusDetailScreen(props) {
  const { route, getCargoRequestStatus, navigation, cargoRequestStatus, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = cargoRequestStatus?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('CargoRequestStatus');
      } else {
        setDeleteModalVisible(false);
        getCargoRequestStatus(routeEntityId);
      }
    }, [routeEntityId, getCargoRequestStatus, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the CargoRequestStatus.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="cargoRequestStatusDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{cargoRequestStatus.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{cargoRequestStatus.name}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CargoRequestStatusEdit', { entityId })}
          accessibilityLabel={'CargoRequestStatus Edit Button'}
          testID="cargoRequestStatusEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'CargoRequestStatus Delete Button'}
          testID="cargoRequestStatusDeleteButton"
        />
        {deleteModalVisible && (
          <CargoRequestStatusDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={cargoRequestStatus}
            testID="cargoRequestStatusDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    cargoRequestStatus: state.cargoRequestStatuses.cargoRequestStatus,
    error: state.cargoRequestStatuses.errorOne,
    fetching: state.cargoRequestStatuses.fetchingOne,
    deleting: state.cargoRequestStatuses.deleting,
    errorDeleting: state.cargoRequestStatuses.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoRequestStatus: (id) => dispatch(CargoRequestStatusActions.cargoRequestStatusRequest(id)),
    getAllCargoRequestStatuses: (options) => dispatch(CargoRequestStatusActions.cargoRequestStatusAllRequest(options)),
    deleteCargoRequestStatus: (id) => dispatch(CargoRequestStatusActions.cargoRequestStatusDeleteRequest(id)),
    resetCargoRequestStatuses: () => dispatch(CargoRequestStatusActions.cargoRequestStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestStatusDetailScreen);
