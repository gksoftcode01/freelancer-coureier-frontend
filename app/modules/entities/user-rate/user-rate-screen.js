import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import UserRateActions from './user-rate.reducer';
import styles from './user-rate-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function UserRateScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { userRate, userRateList, getAllUserRates, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('UserRate entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchUserRates();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [userRate, fetchUserRates]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('UserRateDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No UserRates Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchUserRates = React.useCallback(() => {
    getAllUserRates({ page: page - 1, sort, size });
  }, [getAllUserRates, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchUserRates();
  };
  return (
    <View style={styles.container} testID="userRateScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={userRateList}
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
    userRateList: state.userRates.userRateList,
    userRate: state.userRates.userRate,
    fetching: state.userRates.fetchingAll,
    error: state.userRates.errorAll,
    links: state.userRates.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserRates: (options) => dispatch(UserRateActions.userRateAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRateScreen);
