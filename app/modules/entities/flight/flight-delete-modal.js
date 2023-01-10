import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FlightActions from './flight.reducer';

import styles from './flight-styles';

function FlightDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteFlight(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Flight');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Flight {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    flight: state.flights.flight,
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

export default connect(mapStateToProps, mapDispatchToProps)(FlightDeleteModal);
