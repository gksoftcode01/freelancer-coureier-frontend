import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AskActions from './ask.reducer';
import styles from './ask-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function AskScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { ask, askList, getAllAsks, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Ask entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchAsks();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [ask, fetchAsks]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('AskDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Asks Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchAsks = React.useCallback(() => {
    getAllAsks({ page: page - 1, sort, size });
  }, [getAllAsks, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchAsks();
  };
  return (
    <View style={styles.container} testID="askScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={askList}
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
    askList: state.asks.askList,
    ask: state.asks.ask,
    fetching: state.asks.fetchingAll,
    error: state.asks.errorAll,
    links: state.asks.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAsks: (options) => dispatch(AskActions.askAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskScreen);
