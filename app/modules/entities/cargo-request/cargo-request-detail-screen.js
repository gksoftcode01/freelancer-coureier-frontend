import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CargoRequestActions from './cargo-request.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CargoRequestDeleteModal from './cargo-request-delete-modal';
import styles from './cargo-request-styles';

function CargoRequestDetailScreen(props) {
  const { route, getCargoRequest, navigation, cargoRequest, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = cargoRequest?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('CargoRequest');
      } else {
        setDeleteModalVisible(false);
        getCargoRequest(routeEntityId);
      }
    }, [routeEntityId, getCargoRequest, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the CargoRequest.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="cargoRequestDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{cargoRequest.id}</Text>
      {/* Budget Field */}
      <Text style={styles.label}>Budget:</Text>
      <Text testID="budget">{cargoRequest.budget}</Text>
      {/* IsToDoor Field */}
      <Text style={styles.label}>IsToDoor:</Text>
      <Text testID="isToDoor">{String(cargoRequest.isToDoor)}</Text>
      {/* CreateDate Field */}
      <Text style={styles.label}>CreateDate:</Text>
      <Text testID="createDate">{String(cargoRequest.createDate)}</Text>
      {/* AgreedPrice Field */}
      <Text style={styles.label}>AgreedPrice:</Text>
      <Text testID="agreedPrice">{cargoRequest.agreedPrice}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{String(cargoRequest.status ? cargoRequest.status.name : '')}</Text>
      <Text style={styles.label}>Create By:</Text>
      <Text testID="createBy">{String(cargoRequest.createBy ? cargoRequest.createBy.id : '')}</Text>
      <Text style={styles.label}>Taken By:</Text>
      <Text testID="takenBy">{String(cargoRequest.takenBy ? cargoRequest.takenBy.id : '')}</Text>
      <Text style={styles.label}>From Country:</Text>
      <Text testID="fromCountry">{String(cargoRequest.fromCountry ? cargoRequest.fromCountry.name : '')}</Text>
      <Text style={styles.label}>To Country:</Text>
      <Text testID="toCountry">{String(cargoRequest.toCountry ? cargoRequest.toCountry.name : '')}</Text>
      <Text style={styles.label}>From State:</Text>
      <Text testID="fromState">{String(cargoRequest.fromState ? cargoRequest.fromState.name : '')}</Text>
      <Text style={styles.label}>To State:</Text>
      <Text testID="toState">{String(cargoRequest.toState ? cargoRequest.toState.name : '')}</Text>
      <Text style={styles.label}>From City:</Text>
      <Text testID="fromCity">{String(cargoRequest.fromCity ? cargoRequest.fromCity.name : '')}</Text>
      <Text style={styles.label}>To City:</Text>
      <Text testID="toCity">{String(cargoRequest.toCity ? cargoRequest.toCity.name : '')}</Text>
      <Text style={styles.label}>Req Item Types:</Text>
      {cargoRequest.reqItemTypes &&
        cargoRequest.reqItemTypes.map((entity, index) => (
          <Text key={index} testID={`reqItemTypes-${index}`}>
            {String(entity.name || '')}
          </Text>
        ))}

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CargoRequestEdit', { entityId })}
          accessibilityLabel={'CargoRequest Edit Button'}
          testID="cargoRequestEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'CargoRequest Delete Button'}
          testID="cargoRequestDeleteButton"
        />
        {deleteModalVisible && (
          <CargoRequestDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={cargoRequest}
            testID="cargoRequestDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    cargoRequest: state.cargoRequests.cargoRequest,
    error: state.cargoRequests.errorOne,
    fetching: state.cargoRequests.fetchingOne,
    deleting: state.cargoRequests.deleting,
    errorDeleting: state.cargoRequests.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoRequest: (id) => dispatch(CargoRequestActions.cargoRequestRequest(id)),
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    deleteCargoRequest: (id) => dispatch(CargoRequestActions.cargoRequestDeleteRequest(id)),
    resetCargoRequests: () => dispatch(CargoRequestActions.cargoRequestReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDetailScreen);
