import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import BidActions from './bid.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import BidDeleteModal from './bid-delete-modal';
import styles from './bid-styles';

function BidDetailScreen(props) {
  const { route, getBid, navigation, bid, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = bid?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Bid');
      } else {
        setDeleteModalVisible(false);
        getBid(routeEntityId);
      }
    }, [routeEntityId, getBid, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Bid.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="bidDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{bid.id}</Text>
      {/* Notes Field */}
      <Text style={styles.label}>Notes:</Text>
      <Text testID="notes">{bid.notes}</Text>
      {/* Price Field */}
      <Text style={styles.label}>Price:</Text>
      <Text testID="price">{bid.price}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{bid.status}</Text>
      <Text style={styles.label}>From User:</Text>
      <Text testID="fromUser">{String(bid.fromUser ? bid.fromUser.id : '')}</Text>
      <Text style={styles.label}>Cargo Request:</Text>
      <Text testID="cargoRequest">{String(bid.cargoRequest ? bid.cargoRequest.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('BidEdit', { entityId })}
          accessibilityLabel={'Bid Edit Button'}
          testID="bidEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Bid Delete Button'}
          testID="bidDeleteButton"
        />
        {deleteModalVisible && (
          <BidDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={bid}
            testID="bidDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    bid: state.bids.bid,
    error: state.bids.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(BidDetailScreen);
