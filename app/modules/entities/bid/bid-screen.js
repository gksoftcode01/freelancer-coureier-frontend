import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import BidActions from './bid.reducer';
import styles from './bid-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function BidScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { bid, bidList, getAllBids, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Bid entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchBids();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [bid, fetchBids]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BidDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Bids Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchBids = React.useCallback(() => {
    getAllBids({ page: page - 1, sort, size });
  }, [getAllBids, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchBids();
  };
  return (
    <View style={styles.container} testID="bidScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={bidList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    bidList: state.bids.bidList,
    bid: state.bids.bid,
    fetching: state.bids.fetchingAll,
    error: state.bids.errorAll,
    links: state.bids.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBids: (options) => dispatch(BidActions.bidAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BidScreen);
