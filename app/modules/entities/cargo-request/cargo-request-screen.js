import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CargoRequestActions from './cargo-request.reducer';
import styles from './cargo-request-styles';
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
  itemType
} from '../../../shared/themes/FeedStyles';

import moment from 'moment/min/moment-with-locales';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';

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
      {/* <FlatList
        contentContainerStyle={styles.listContent}
        data={cargoRequestList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      /> */}
       <FlatList
              data={cargoRequestList}
              keyExtractor={(item) => item.id}    
              initialNumToRender={oneScreensWorth}
              onEndReached={handleLoadMore}
              ListEmptyComponent={renderEmpty} 
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => props.navigation.navigate('CargoRequestDetail', { entityId: item.id })} >
                <Card key={item.id} >  
                <UserInfo>
                  <UserImg
                  source={
                    item.toUserImg
                      ? item.toUserImg
                      : require('../../../../assets/avatar3.jpg')
                  }
                  />
                  <UserInfoText>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.createBy.id })} >
                      <UserName >
                        {item.createBy?.firstName  }{' '}
                        {item.createBy?.lastName  }
                      </UserName>
                    </TouchableOpacity>
                    <UserRate>
                  <StarRating
                     rating={item.createBy?.avgRateClient}
                  onChange={()=> {return null;} }
                  starSize={18}
                     />
                     <Text style={styles.smallBlackLabel}>({item.createBy?.totalRateClient})</Text>
                  </UserRate>
                   </UserInfoText>
                 
                </UserInfo>
                <PostText>
                <Text style={styles.orangeLabel}> {item.fromCountry?.name}  </Text>
                {' '}   
                <Ionicons name="airplane-outline" size={18} color={props.tintColor} />
                {' '} 
                <Text style={styles.orangeLabel}>  {item.toCountry?.name}  </Text>
                       
                 </PostText>
                 <PostText>
                 <Text style={styles.label}>  {item.isToDoor?'To Door':'' } </Text>  
                 {' '}
                 <Text   style={styles.label}>{Number(item.budget) > 0?` Budget : ${Number(item.budget)} AED` :''}</Text>

             
                  </PostText>
                  
                    {item.reqItemTypes?.length>0?(<PostText> 
                         {item.reqItemTypes.map((entity, index) => (
          <>
          <Text style={styles.backgroundlabel} key={index} >
            {String(entity.name || ' ')}   
          </Text>
          {' '}
          </>
        ))}    </PostText>):null}
                            <PostTime>{ moment(new Date(item.createDate)).fromNow()}</PostTime>

                        </Card>
                  </TouchableOpacity>
            
              )}
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
