import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import AskActions from './ask.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import AskDeleteModal from './ask-delete-modal';
import styles from './ask-styles';

function AskDetailScreen(props) {
  const { route, getAsk, navigation, ask, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = ask?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Ask');
      } else {
        setDeleteModalVisible(false);
        getAsk(routeEntityId);
      }
    }, [routeEntityId, getAsk, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Ask.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="askDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{ask.id}</Text>
      {/* Notes Field */}
      <Text style={styles.label}>Notes:</Text>
      <Text testID="notes">{ask.notes}</Text>
      {/* Price Field */}
      <Text style={styles.label}>Price:</Text>
      <Text testID="price">{ask.price}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{ask.status}</Text>
      <Text style={styles.label}>To User:</Text>
      <Text testID="toUser">{String(ask.toUser ? ask.toUser.id : '')}</Text>
      <Text style={styles.label}>Cargo Request:</Text>
      <Text testID="cargoRequest">{String(ask.cargoRequest ? ask.cargoRequest.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('AskEdit', { entityId })}
          accessibilityLabel={'Ask Edit Button'}
          testID="askEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Ask Delete Button'}
          testID="askDeleteButton"
        />
        {deleteModalVisible && (
          <AskDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={ask}
            testID="askDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    ask: state.asks.ask,
    error: state.asks.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(AskDetailScreen);
