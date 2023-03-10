import React ,{useContext} from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FlightActions from './flight.reducer';
import styles from './flight-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
  UserRate,
  itemType,
} from '../../../shared/themes/FeedStyles';

import moment from 'moment/min/moment-with-locales';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
import FilterModal from '../../../shared/components/filter/filter-model';
 function FlightScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,desc');
  const [size /*, setSize*/] = React.useState(20);
  
 
  const [filterVisible,setFilterVisible] = React.useState(false); 
  const { flight, flightList, getAllFlights, fetching ,account ,filterentity,totalItems , navigation} = props;
 
  useFocusEffect(
    React.useCallback(() => {
      if ( account && account.login) {
        console.debug('Flight entity changed and the list screen is now in focus, refresh');
        setPage(0);
      fetchFlights();
      }else { 
        navigation.navigate('Home');

      }
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [flight,filterentity]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('FlightDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>
            From: {item.fromCountry?.name} to: {item.toCountry?.name}{' '}
          </Text>
          <Text style={styles.label}>{new Date(item.flightDate).toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Flights Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchFlights = React.useCallback(() => {
     console.log(filterentity);
    getAllFlights({ page: page - 1, sort, size, fromCountry :filterentity?.fromCountry?.id ,
      createBy :  account.id, 
      toCountry : filterentity?.toCountry?.id , isMine : filterentity?.isMine ,isAskSent : filterentity?.isAskSent });
      //  let filterentity2 = Object.assign({}, filterentity);
      //  filterentity2.isChanged = false;
      //  flightFilter(filterentity2);
   }, [getAllFlights, page, sort, size,flightList,filterentity,account]);

  // React.useEffect(() => {
  //   setPage(0);
  //    fetchFlights();
  // }, [filterentity ]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
   fetchFlights();
  };
  return (
    <View style={styles.container} testID="flightScreen">
      {/* <FlatList
        contentContainerStyle={styles.listContent}
        data={flightList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      /> */}
      {totalItems>0?(
      <FlatList
        data={flightList}
        keyExtractor={(item) => item.id}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
        key={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.navigation.navigate('FlightDetail', { entityId: item.id })}>
            <Card  key={item.id}>
              <UserInfo>
                <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.createBy.id,whoView : 'client' })}>
                  <UserImg source={ {uri :item.createBy.imageUrl ? item.createBy.imageUrl : require('../../../../assets/avatar3.jpg')}} />
                </TouchableOpacity>
                <UserInfoText>
                  <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.createBy.id,whoView : 'client' })}>
                    <UserName>
                      {item.createBy.firstName} {item.createBy.lastName}
                    </UserName>
                  </TouchableOpacity>
                  <UserRate>
                    <StarRating
                      rating={item.createBy.avgRateCourier}
                      onChange={() => {
                        return null;
                      }}
                      starSize={18}
                    />
                    <Text style={styles.smallBlackLabel}>({item.createBy.totalRateCourier})</Text>
                  </UserRate>
                </UserInfoText>
              </UserInfo>
              <PostText>
                <Text style={styles.orangeLabel}> {item.fromCountry?.name} </Text>{' '}
                <Ionicons name="airplane-outline" size={18} color={props.tintColor} />{' '}
                <Text style={styles.orangeLabel}> {item.toCountry?.name} </Text>
              </PostText>
              <PostText>
                <Text style={styles.label}> {moment(new Date(item.flightDate)).format('MMMM Do YYYY, h:mm a')} </Text>{' '}
                <Text style={styles.smallBlackLabel}>{Number(item.maxWeight) > 0 ? ` - Max Weight:${Number(item.maxWeight)} KG` : ''}</Text>
              </PostText>
              {item.availableItemTypes?.length > 0 ? (
                <View style={styles.flexRow}>
                  {item.availableItemTypes.map((entity, index) => (
                       <Text style={styles.backgroundlabel} key={index}>
                        {String(entity.name || ' ')}
                      </Text> 
                   ))} 
                </View>
              ) : null}
              <PostTime>{moment(new Date(item.createDate)).fromNow()}</PostTime>
            </Card>
          </TouchableOpacity>
        )}
      />
      ):( <AlertMessage title="No Flights Found" />)}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    flightList: state.flights.flightList,
    flight: state.flights.flight,
    fetching: state.flights.fetchingAll,
    error: state.flights.errorAll,
    links: state.flights.links,
    account: state.account.account,
    filterentity: state.flights.filterentity,
    totalItems: state.flights.totalItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFlights: (options) => dispatch(FlightActions.flightAllRequest(options)),
    flightFilter:(filterentity)=> dispatch(FlightActions.flightFilter(filterentity)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightScreen);
