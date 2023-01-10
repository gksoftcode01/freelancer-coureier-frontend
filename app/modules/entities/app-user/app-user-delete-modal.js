import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AppUserActions from './app-user.reducer';

import styles from './app-user-styles';

function AppUserDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteAppUser(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('AppUser');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete AppUser {entity.id}?</Text>
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
    appUser: state.appUsers.appUser,
    fetching: state.appUsers.fetchingOne,
    deleting: state.appUsers.deleting,
    errorDeleting: state.appUsers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppUser: (id) => dispatch(AppUserActions.appUserRequest(id)),
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
    deleteAppUser: (id) => dispatch(AppUserActions.appUserDeleteRequest(id)),
    resetAppUsers: () => dispatch(AppUserActions.appUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUserDeleteModal);
