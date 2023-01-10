import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CityActions from './city.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CityDeleteModal from './city-delete-modal';
import styles from './city-styles';

function CityDetailScreen(props) {
  const { route, getCity, navigation, city, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = city?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('City');
      } else {
        setDeleteModalVisible(false);
        getCity(routeEntityId);
      }
    }, [routeEntityId, getCity, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the City.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="cityDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{city.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{city.name}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CityEdit', { entityId })}
          accessibilityLabel={'City Edit Button'}
          testID="cityEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'City Delete Button'}
          testID="cityDeleteButton"
        />
        {deleteModalVisible && (
          <CityDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={city}
            testID="cityDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    city: state.cities.city,
    error: state.cities.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(CityDetailScreen);
