import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CargoRequestDetailsActions from './cargo-request-details.reducer';

import styles from './cargo-request-details-styles';

function CargoRequestDetailsDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCargoRequestDetails(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('CargoRequestDetails');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete CargoRequestDetails {entity.id}?</Text>
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
    cargoRequestDetails: state.cargoRequestDetails.cargoRequestDetails,
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

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDetailsDeleteModal);
