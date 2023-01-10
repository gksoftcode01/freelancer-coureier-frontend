import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CargoRequestDetailsActions from './cargo-request-details.reducer';
import styles from './cargo-request-details-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CargoRequestDetailsScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { cargoRequestDetails, cargoRequestDetailsList, getAllCargoRequestDetails, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('CargoRequestDetails entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCargoRequestDetails();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [cargoRequestDetails, fetchCargoRequestDetails]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CargoRequestDetailsDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No CargoRequestDetails Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCargoRequestDetails = React.useCallback(() => {
    getAllCargoRequestDetails({ page: page - 1, sort, size });
  }, [getAllCargoRequestDetails, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchCargoRequestDetails();
  };
  return (
    <View style={styles.container} testID="cargoRequestDetailsScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={cargoRequestDetailsList}
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
    cargoRequestDetailsList: state.cargoRequestDetails.cargoRequestDetailsList,
    cargoRequestDetails: state.cargoRequestDetails.cargoRequestDetails,
    fetching: state.cargoRequestDetails.fetchingAll,
    error: state.cargoRequestDetails.errorAll,
    links: state.cargoRequestDetails.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCargoRequestDetails: (options) => dispatch(CargoRequestDetailsActions.cargoRequestDetailsAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDetailsScreen);
