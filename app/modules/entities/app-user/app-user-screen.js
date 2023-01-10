import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppUserActions from './app-user.reducer';
import styles from './app-user-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function AppUserScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { appUser, appUserList, getAllAppUsers, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('AppUser entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchAppUsers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [appUser, fetchAppUsers]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No AppUsers Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchAppUsers = React.useCallback(() => {
    getAllAppUsers({ page: page - 1, sort, size });
  }, [getAllAppUsers, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchAppUsers();
  };
  return (
    <View style={styles.container} testID="appUserScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={appUserList}
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
    appUserList: state.appUsers.appUserList,
    appUser: state.appUsers.appUser,
    fetching: state.appUsers.fetchingAll,
    error: state.appUsers.errorAll,
    links: state.appUsers.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUserScreen);
