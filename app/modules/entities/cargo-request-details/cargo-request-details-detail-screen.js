import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CargoRequestDetailsActions from './cargo-request-details.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CargoRequestDetailsDeleteModal from './cargo-request-details-delete-modal';
import styles from './cargo-request-details-styles';

function CargoRequestDetailsDetailScreen(props) {
  const { route, getCargoRequestDetails, navigation, cargoRequestDetails, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = cargoRequestDetails?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('CargoRequestDetails');
      } else {
        setDeleteModalVisible(false);
        getCargoRequestDetails(routeEntityId);
      }
    }, [routeEntityId, getCargoRequestDetails, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the CargoRequestDetails.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="cargoRequestDetailsDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{cargoRequestDetails.id}</Text>
      {/* ItemDesc Field */}
      <Text style={styles.label}>ItemDesc:</Text>
      <Text testID="itemDesc">{cargoRequestDetails.itemDesc}</Text>
      {/* ItemWeight Field */}
      <Text style={styles.label}>ItemWeight:</Text>
      <Text testID="itemWeight">{cargoRequestDetails.itemWeight}</Text>
      {/* ItemHeight Field */}
      <Text style={styles.label}>ItemHeight:</Text>
      <Text testID="itemHeight">{cargoRequestDetails.itemHeight}</Text>
      {/* ItemWidth Field */}
      <Text style={styles.label}>ItemWidth:</Text>
      <Text testID="itemWidth">{cargoRequestDetails.itemWidth}</Text>
      {/* ItemPhoto Field */}
      <Text style={styles.label}>ItemPhoto:</Text>
      <Text testID="itemPhoto">Open {cargoRequestDetails.itemPhotoContentType} (not implemented)</Text>
      <Text style={styles.label}>Cargo Request:</Text>
      <Text testID="cargoRequest">{String(cargoRequestDetails.cargoRequest ? cargoRequestDetails.cargoRequest.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CargoRequestDetailsEdit', { entityId })}
          accessibilityLabel={'CargoRequestDetails Edit Button'}
          testID="cargoRequestDetailsEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'CargoRequestDetails Delete Button'}
          testID="cargoRequestDetailsDeleteButton"
        />
        {deleteModalVisible && (
          <CargoRequestDetailsDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={cargoRequestDetails}
            testID="cargoRequestDetailsDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    cargoRequestDetails: state.cargoRequestDetails.cargoRequestDetails,
    error: state.cargoRequestDetails.errorOne,
    fetching: state.cargoRequestDetails.fetchingOne,
    deleting: state.cargoRequestDetails.deleting,
    errorDeleting: state.cargoRequestDetails.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoRequestDetails: (id) => dispatch(CargoRequestDetailsActions.cargoRequestDetailsRequest(id)),
    getAllCargoRequestDetails: (options) => dispatch(CargoRequestDetailsActions.cargoRequestDetailsAllRequest(options)),
    deleteCargoRequestDetails: (id) => dispatch(CargoRequestDetailsActions.cargoRequestDetailsDeleteRequest(id)),
    resetCargoRequestDetails: () => dispatch(CargoRequestDetailsActions.cargoRequestDetailsReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDetailsDetailScreen);
