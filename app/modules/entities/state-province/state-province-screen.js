import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import StateProvinceActions from './state-province.reducer';
import styles from './state-province-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function StateProvinceScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { stateProvince, stateProvinceList, getAllStateProvinces, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('StateProvince entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchStateProvinces();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [stateProvince, fetchStateProvinces]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('StateProvinceDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No StateProvinces Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchStateProvinces = React.useCallback(() => {
    getAllStateProvinces({ page: page - 1, sort, size });
  }, [getAllStateProvinces, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchStateProvinces();
  };
  return (
    <View style={styles.container} testID="stateProvinceScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={stateProvinceList}
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
    stateProvinceList: state.stateProvinces.stateProvinceList,
    stateProvince: state.stateProvinces.stateProvince,
    fetching: state.stateProvinces.fetchingAll,
    error: state.stateProvinces.errorAll,
    links: state.stateProvinces.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStateProvinces: (options) => dispatch(StateProvinceActions.stateProvinceAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateProvinceScreen);
