import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CityActions from './city.reducer';
import styles from './city-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CityScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { city, cityList, getAllCities, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('City entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCities();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [city, fetchCities]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CityDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Cities Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCities = React.useCallback(() => {
    getAllCities({ page: page - 1, sort, size });
  }, [getAllCities, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchCities();
  };
  return (
    <View style={styles.container} testID="cityScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={cityList}
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
    cityList: state.cities.cityList,
    city: state.cities.city,
    fetching: state.cities.fetchingAll,
    error: state.cities.errorAll,
    links: state.cities.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCities: (options) => dispatch(CityActions.cityAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CityScreen);
