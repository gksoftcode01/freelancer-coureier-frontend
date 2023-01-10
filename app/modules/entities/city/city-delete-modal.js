import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CityActions from './city.reducer';

import styles from './city-styles';

function CityDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCity(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('City');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete City {entity.id}?</Text>
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
    city: state.cities.city,
    fetching: state.cities.fetchingOne,
    deleting: state.cities.deleting,
    errorDeleting: state.cities.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCity: (id) => dispatch(CityActions.cityRequest(id)),
    getAllCities: (options) => dispatch(CityActions.cityAllRequest(options)),
    deleteCity: (id) => dispatch(CityActions.cityDeleteRequest(id)),
    resetCities: () => dispatch(CityActions.cityReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityDeleteModal);
