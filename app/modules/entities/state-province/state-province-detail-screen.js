import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import StateProvinceActions from './state-province.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import StateProvinceDeleteModal from './state-province-delete-modal';
import styles from './state-province-styles';

function StateProvinceDetailScreen(props) {
  const { route, getStateProvince, navigation, stateProvince, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = stateProvince?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('StateProvince');
      } else {
        setDeleteModalVisible(false);
        getStateProvince(routeEntityId);
      }
    }, [routeEntityId, getStateProvince, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the StateProvince.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="stateProvinceDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{stateProvince.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{stateProvince.name}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('StateProvinceEdit', { entityId })}
          accessibilityLabel={'StateProvince Edit Button'}
          testID="stateProvinceEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'StateProvince Delete Button'}
          testID="stateProvinceDeleteButton"
        />
        {deleteModalVisible && (
          <StateProvinceDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={stateProvince}
            testID="stateProvinceDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    stateProvince: state.stateProvinces.stateProvince,
    error: state.stateProvinces.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(StateProvinceDetailScreen);
