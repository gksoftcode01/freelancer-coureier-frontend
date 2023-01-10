import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ItemTypesActions from './item-types.reducer';

import styles from './item-types-styles';

function ItemTypesDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteItemTypes(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ItemTypes');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ItemTypes {entity.id}?</Text>
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
    itemTypes: state.itemTypes.itemTypes,
    fetching: state.itemTypes.fetchingOne,
    deleting: state.itemTypes.deleting,
    errorDeleting: state.itemTypes.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItemTypes: (id) => dispatch(ItemTypesActions.itemTypesRequest(id)),
    getAllItemTypes: (options) => dispatch(ItemTypesActions.itemTypesAllRequest(options)),
    deleteItemTypes: (id) => dispatch(ItemTypesActions.itemTypesDeleteRequest(id)),
    resetItemTypes: () => dispatch(ItemTypesActions.itemTypesReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTypesDeleteModal);
