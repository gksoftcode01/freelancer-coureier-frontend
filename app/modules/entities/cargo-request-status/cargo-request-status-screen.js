import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CargoRequestStatusActions from './cargo-request-status.reducer';
import styles from './cargo-request-status-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CargoRequestStatusScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { cargoRequestStatus, cargoRequestStatusList, getAllCargoRequestStatuses, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('CargoRequestStatus entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCargoRequestStatuses();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [cargoRequestStatus, fetchCargoRequestStatuses]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CargoRequestStatusDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No CargoRequestStatuses Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCargoRequestStatuses = React.useCallback(() => {
    getAllCargoRequestStatuses({ page: page - 1, sort, size });
  }, [getAllCargoRequestStatuses, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchCargoRequestStatuses();
  };
  return (
    <View style={styles.container} testID="cargoRequestStatusScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={cargoRequestStatusList}
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
    cargoRequestStatusList: state.cargoRequestStatuses.cargoRequestStatusList,
    cargoRequestStatus: state.cargoRequestStatuses.cargoRequestStatus,
    fetching: state.cargoRequestStatuses.fetchingAll,
    error: state.cargoRequestStatuses.errorAll,
    links: state.cargoRequestStatuses.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCargoRequestStatuses: (options) => dispatch(CargoRequestStatusActions.cargoRequestStatusAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestStatusScreen);
