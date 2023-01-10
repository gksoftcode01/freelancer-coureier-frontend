import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import StateProvinceActions from './state-province.reducer';

import styles from './state-province-styles';

function StateProvinceDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteStateProvince(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('StateProvince');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete StateProvince {entity.id}?</Text>
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
    stateProvince: state.stateProvinces.stateProvince,
    fetching: state.stateProvinces.fetchingOne,
    deleting: state.stateProvinces.deleting,
    errorDeleting: state.stateProvinces.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStateProvince: (id) => dispatch(StateProvinceActions.stateProvinceRequest(id)),
    getAllStateProvinces: (options) => dispatch(StateProvinceActions.stateProvinceAllRequest(options)),
    deleteStateProvince: (id) => dispatch(StateProvinceActions.stateProvinceDeleteRequest(id)),
    resetStateProvinces: () => dispatch(StateProvinceActions.stateProvinceReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateProvinceDeleteModal);
