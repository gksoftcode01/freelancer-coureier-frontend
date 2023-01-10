import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CargoRequestActions from './cargo-request.reducer';

import styles from './cargo-request-styles';

function CargoRequestDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCargoRequest(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('CargoRequest');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete CargoRequest {entity.id}?</Text>
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
    cargoRequest: state.cargoRequests.cargoRequest,
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

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDeleteModal);
