import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CargoRequestStatusActions from './cargo-request-status.reducer';

import styles from './cargo-request-status-styles';

function CargoRequestStatusDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCargoRequestStatus(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('CargoRequestStatus');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete CargoRequestStatus {entity.id}?</Text>
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
    cargoRequestStatus: state.cargoRequestStatuses.cargoRequestStatus,
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

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestStatusDeleteModal);
