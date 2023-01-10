import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import BidActions from './bid.reducer';

import styles from './bid-styles';

function BidDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteBid(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Bid');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Bid {entity.id}?</Text>
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
    bid: state.bids.bid,
    fetching: state.bids.fetchingOne,
    deleting: state.bids.deleting,
    errorDeleting: state.bids.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBid: (id) => dispatch(BidActions.bidRequest(id)),
    getAllBids: (options) => dispatch(BidActions.bidAllRequest(options)),
    deleteBid: (id) => dispatch(BidActions.bidDeleteRequest(id)),
    resetBids: () => dispatch(BidActions.bidReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BidDeleteModal);
