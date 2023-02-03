import React ,{useContext} from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import NotificationActions from './notification.reducer'
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
  function NotificationScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,desc');
  const [size /*, setSize*/] = React.useState(20);
  
 
   const { notificationList, getAllNotifications, fetching ,account ,totalItems} = props;
 
 

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
  const renderEmpty = () => <AlertMessage title="No Notification Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchNotifications = React.useCallback(() => {
    getAllNotifications({ page: page - 1, sort, size });
      //  let filterentity2 = Object.assign({}, filterentity);
      //  filterentity2.isChanged = false;
      //  flightFilter(filterentity2);
   }, [getAllNotifications, page, sort, size,notificationList]);
   useFocusEffect(
    React.useCallback(() => {
       setPage(0);
      fetchNotifications();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []),
  );


  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchNotifications();
  };
  return (
    <View style={styles.container}>
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
        data={notificationList}
        keyExtractor={(item) => item.id}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
        key={(item) => item.id}
        renderItem={({ item }) => (
          
          <TouchableOpacity 
          onPress={() =>  props.navigation.navigate( item.targetStack, {  screen: item.targetScreen
                                    , params:  { entityId: item.targetId } } )    }>
            <Card  key={item.id} style={{backgroundColor : item.seen?'white':'#4a6ee02b'}} >
              <UserInfo>
                   <UserImg source={ {uri :item.fromUser.imageUrl ? item.fromUser.imageUrl : require('../../../../assets/avatar3.jpg')}} />
              
                <UserInfoText>
                     <UserName>
                      {item.fromUser.firstName} {item.fromUser.lastName}
                    </UserName>
                  
                </UserInfoText>
              </UserInfo>
              <PostText>
                <Text style={styles.label}> {item.msg} </Text>{' '}
            
              </PostText>
             
            
              <PostTime>{moment(new Date(item.createDate)).fromNow()}</PostTime>
            </Card>
          </TouchableOpacity>
        )}
      />
      ):( <AlertMessage title="No Notification Found" />)}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    notificationList: state.notifications.notificationList,
     fetching: state.notifications.fetchingAll,
    error: state.notifications.errorAll,
    links: state.notifications.links,
    account: state.account.account,
    totalItems: state.notifications.totalItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
