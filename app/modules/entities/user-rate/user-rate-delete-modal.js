import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import UserRateActions from './user-rate.reducer';

import styles from './user-rate-styles';

function UserRateDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteUserRate(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('UserRate');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete UserRate {entity.id}?</Text>
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
    userRate: state.userRates.userRate,
    fetching: state.userRates.fetchingOne,
    deleting: state.userRates.deleting,
    errorDeleting: state.userRates.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserRate: (id) => dispatch(UserRateActions.userRateRequest(id)),
    getAllUserRates: (options) => dispatch(UserRateActions.userRateAllRequest(options)),
    deleteUserRate: (id) => dispatch(UserRateActions.userRateDeleteRequest(id)),
    resetUserRates: () => dispatch(UserRateActions.userRateReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRateDeleteModal);
