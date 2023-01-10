import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AskActions from './ask.reducer';

import styles from './ask-styles';

function AskDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteAsk(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Ask');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Ask {entity.id}?</Text>
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
    ask: state.asks.ask,
    fetching: state.asks.fetchingOne,
    deleting: state.asks.deleting,
    errorDeleting: state.asks.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAsk: (id) => dispatch(AskActions.askRequest(id)),
    getAllAsks: (options) => dispatch(AskActions.askAllRequest(options)),
    deleteAsk: (id) => dispatch(AskActions.askDeleteRequest(id)),
    resetAsks: () => dispatch(AskActions.askReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskDeleteModal);
