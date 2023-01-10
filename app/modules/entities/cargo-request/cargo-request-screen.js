import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CargoRequestActions from './cargo-request.reducer';
import styles from './cargo-request-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CargoRequestScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { cargoRequest, cargoRequestList, getAllCargoRequests, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('CargoRequest entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCargoRequests();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [cargoRequest, fetchCargoRequests]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CargoRequestDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No CargoRequests Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCargoRequests = React.useCallback(() => {
    getAllCargoRequests({ page: page - 1, sort, size });
  }, [getAllCargoRequests, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchCargoRequests();
  };
  return (
    <View style={styles.container} testID="cargoRequestScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={cargoRequestList}
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
    cargoRequestList: state.cargoRequests.cargoRequestList,
    cargoRequest: state.cargoRequests.cargoRequest,
    fetching: state.cargoRequests.fetchingAll,
    error: state.cargoRequests.errorAll,
    links: state.cargoRequests.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestScreen);
