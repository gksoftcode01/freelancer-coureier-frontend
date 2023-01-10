import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ItemTypesActions from './item-types.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ItemTypesDeleteModal from './item-types-delete-modal';
import styles from './item-types-styles';

function ItemTypesDetailScreen(props) {
  const { route, getItemTypes, navigation, itemTypes, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = itemTypes?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ItemTypes');
      } else {
        setDeleteModalVisible(false);
        getItemTypes(routeEntityId);
      }
    }, [routeEntityId, getItemTypes, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ItemTypes.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="itemTypesDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{itemTypes.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{itemTypes.name}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ItemTypesEdit', { entityId })}
          accessibilityLabel={'ItemTypes Edit Button'}
          testID="itemTypesEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ItemTypes Delete Button'}
          testID="itemTypesDeleteButton"
        />
        {deleteModalVisible && (
          <ItemTypesDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={itemTypes}
            testID="itemTypesDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    itemTypes: state.itemTypes.itemTypes,
    error: state.itemTypes.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemTypesDetailScreen);
