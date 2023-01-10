import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import FlightActions from './flight.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FlightDeleteModal from './flight-delete-modal';
import styles from './flight-styles';

function FlightDetailScreen(props) {
  const { route, getFlight, navigation, flight, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = flight?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Flight');
      } else {
        setDeleteModalVisible(false);
        getFlight(routeEntityId);
      }
    }, [routeEntityId, getFlight, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Flight.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="flightDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{flight.id}</Text>
      {/* FlightDate Field */}
      <Text style={styles.label}>FlightDate:</Text>
      <Text testID="flightDate">{String(flight.flightDate)}</Text>
      {/* MaxWeight Field */}
      <Text style={styles.label}>MaxWeight:</Text>
      <Text testID="maxWeight">{flight.maxWeight}</Text>
      {/* Notes Field */}
      <Text style={styles.label}>Notes:</Text>
      <Text testID="notes">{flight.notes}</Text>
      {/* Budget Field */}
      <Text style={styles.label}>Budget:</Text>
      <Text testID="budget">{flight.budget}</Text>
      {/* CreateDate Field */}
      <Text style={styles.label}>CreateDate:</Text>
      <Text testID="createDate">{String(flight.createDate)}</Text>
      {/* ToDoorAvailable Field */}
      <Text style={styles.label}>ToDoorAvailable:</Text>
      <Text testID="toDoorAvailable">{String(flight.toDoorAvailable)}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{flight.status}</Text>
      <Text style={styles.label}>Create By:</Text>
      <Text testID="createBy">{String(flight.createBy ? flight.createBy.id : '')}</Text>
      <Text style={styles.label}>From Country:</Text>
      <Text testID="fromCountry">{String(flight.fromCountry ? flight.fromCountry.name : '')}</Text>
      <Text style={styles.label}>To Country:</Text>
      <Text testID="toCountry">{String(flight.toCountry ? flight.toCountry.name : '')}</Text>
      <Text style={styles.label}>From State:</Text>
      <Text testID="fromState">{String(flight.fromState ? flight.fromState.name : '')}</Text>
      <Text style={styles.label}>To State:</Text>
      <Text testID="toState">{String(flight.toState ? flight.toState.name : '')}</Text>
      <Text style={styles.label}>From City:</Text>
      <Text testID="fromCity">{String(flight.fromCity ? flight.fromCity.name : '')}</Text>
      <Text style={styles.label}>To City:</Text>
      <Text testID="toCity">{String(flight.toCity ? flight.toCity.name : '')}</Text>
      <Text style={styles.label}>Available Item Types:</Text>
      {flight.availableItemTypes &&
        flight.availableItemTypes.map((entity, index) => (
          <Text key={index} testID={`availableItemTypes-${index}`}>
            {String(entity.name || '')}
          </Text>
        ))}

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('FlightEdit', { entityId })}
          accessibilityLabel={'Flight Edit Button'}
          testID="flightEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Flight Delete Button'}
          testID="flightDeleteButton"
        />
        {deleteModalVisible && (
          <FlightDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={flight}
            testID="flightDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    flight: state.flights.flight,
    error: state.flights.errorOne,
    fetching: state.flights.fetchingOne,
    deleting: state.flights.deleting,
    errorDeleting: state.flights.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFlight: (id) => dispatch(FlightActions.flightRequest(id)),
    getAllFlights: (options) => dispatch(FlightActions.flightAllRequest(options)),
    deleteFlight: (id) => dispatch(FlightActions.flightDeleteRequest(id)),
    resetFlights: () => dispatch(FlightActions.flightReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetailScreen);
