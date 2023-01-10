import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ItemTypesActions from './item-types.reducer';
import styles from './item-types-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ItemTypesScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { itemTypes, itemTypesList, getAllItemTypes, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ItemTypes entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchItemTypes();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [itemTypes, fetchItemTypes]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ItemTypesDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ItemTypes Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchItemTypes = React.useCallback(() => {
    getAllItemTypes({ page: page - 1, sort, size });
  }, [getAllItemTypes, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchItemTypes();
  };
  return (
    <View style={styles.container} testID="itemTypesScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={itemTypesList}
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
    itemTypesList: state.itemTypes.itemTypesList,
    itemTypes: state.itemTypes.itemTypes,
    fetching: state.itemTypes.fetchingAll,
    error: state.itemTypes.errorAll,
    links: state.itemTypes.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItemTypes: (options) => dispatch(ItemTypesActions.itemTypesAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTypesScreen);
