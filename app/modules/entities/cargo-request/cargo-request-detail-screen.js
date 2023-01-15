import React from 'react';
import { ActivityIndicator, ScrollView, Text, View ,TouchableOpacity , FlatList } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CargoRequestActions from './cargo-request.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CargoRequestDeleteModal from './cargo-request-delete-modal';
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
  itemType,
  controlIcons
} from '../../../shared/themes/FeedStyles';
import BidActions from '../bid/bid.reducer';

import moment from 'moment/min/moment-with-locales';
 import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
import BidDeleteModal from '../bid/bid-delete-modal';
import { Colors } from '../../../shared/themes';


function CargoRequestDetailScreen(props) {
  const { route, getCargoRequest, updateCargoRequest,navigation, cargoRequest, fetching, error,account , updateBid } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [deleteBidModalVisible, setDeleteBidModalVisible] = React.useState(false);
  const [addBidModalVisible, setAddBidModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = cargoRequest?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();
  const renderEmpty = () => <AlertMessage title="No Bids Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('CargoRequest');
      } else {
        setDeleteModalVisible(false);
        setDeleteBidModalVisible(false);

        getCargoRequest(routeEntityId);
      }
    }, [routeEntityId, getCargoRequest, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the CargoRequest.</Text>
      </View>
    );
  }
  const renderBidRow = ({ item ,reqId}) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BidDetail', { entityId: item.id , cargoRequestId : reqId })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };
const updateBidStatus =(bid,status) =>{
  const item2 = Object.assign({}, bid);
  item2.status =status ;
  item2.cargoRequest = cargoRequest;
   updateBid(item2);
   if(status=='Approve'){
    console.log(cargoRequest);
    cargoRequest.status = 2 ; //finished 
    cargoRequest.agreedPrice = bid.price;
    cargoRequest.takenBy.user.id = bid.fromUser.user.id;
    updateCargoRequest(cargoRequest);
   }
}
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="cargoRequestDetailScrollView">
            <Card key={cargoRequest.id}>

            {account.id==cargoRequest.createBy.id? ( 
               <controlIcons style={{width: '100%',textAlign: 'right',padding:0 }} >
               <Ionicons name="trash-outline" size={24} color={'red'}  onPress={() => setDeleteModalVisible(true)} />{'  '}
               <Ionicons name="create-outline" size={24} color={'blue'}
                 onPress={() => navigation.navigate('CargoRequestEdit', { entityId })}/>   
            
               
               
 
        {deleteModalVisible && (
          <CargoRequestDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={cargoRequest}
            testID="cargoRequestDeleteModal"
          />
        )} 
          </controlIcons>
             ):(
              <PostText>
                 
              </PostText>
            )}
           
            <PostText>
      <Text style={styles.label}>Budget: </Text>
      <Text testID="budget">{cargoRequest.budget}</Text>
     
      </PostText>
      <PostText>
      <Text style={styles.label}>IsToDoor: </Text>
      <Text testID="isToDoor">{String(cargoRequest.isToDoor)}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>CreateDate: </Text>
      <Text testID="createDate">{String(cargoRequest.createDate)}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>AgreedPrice: </Text>
      <Text testID="agreedPrice">{cargoRequest.agreedPrice}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>Status: </Text>
      <Text testID="status">{String(cargoRequest.status ? cargoRequest.status.name : '')}</Text>
      </PostText>
      <PostText>

      {/* <Text style={styles.label}>Taken By:</Text>
      <Text testID="takenBy">{String(cargoRequest.takenBy ? cargoRequest.takenBy.id : '')}</Text> */}
      <Text style={styles.label}>From Country: </Text>
      <Text testID="fromCountry">{String(cargoRequest.fromCountry ? cargoRequest.fromCountry.name : '')}</Text> 
      </PostText>
      <PostText>
      <Text style={styles.label}>To Country: </Text>
      <Text testID="toCountry">{String(cargoRequest.toCountry ? cargoRequest.toCountry.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>From State: </Text>
      <Text testID="fromState">{String(cargoRequest.fromState ? cargoRequest.fromState.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>To State: </Text>
      <Text testID="toState">{String(cargoRequest.toState ? cargoRequest.toState.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>From City: </Text>
      <Text testID="fromCity">{String(cargoRequest.fromCity ? cargoRequest.fromCity.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>To City: </Text>
      <Text testID="toCity">{String(cargoRequest.toCity ? cargoRequest.toCity.name : '')}</Text>
      </PostText>

      <PostText>
      <Text style={styles.label}>Description : </Text>
      <Text  >{ cargoRequest.packageDesc }</Text>
      </PostText>

      <PostText>
      <Text style={styles.label}>weight : </Text>
      <Text  >{ cargoRequest.weight }</Text>
      </PostText>

      <PostText>
      <Text style={styles.label}>Req Item Types: </Text>
      {cargoRequest.reqItemTypes?.length>0?(<View style={styles.flexRow}> 
                         {cargoRequest.reqItemTypes.map((entity, index) => (
          <>
          <Text style={styles.backgroundlabel} key={index} >
            {String(entity.name || ' ')}   
          </Text>
          {' '}
          </>
        ))}    </View> ):null}

        </PostText>
      
 </Card>

 
 {/* <FlatList
        data={cargoRequest.bids}
        keyExtractor={(item) => item.id}
         ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (  */}
            {cargoRequest.status!=1 && cargoRequest.bids?.length>0? 
                         cargoRequest.bids.map((item, index) => (
             <Card key={item.id}>
              <UserInfo>
                <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.fromUser.id })}>
                  <UserImg source={item.toUserImg ? item.toUserImg : require('../../../../assets/avatar3.jpg')} />
                </TouchableOpacity>
                <UserInfoText>
                  <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.fromUser.id })}>
                    <UserName>
                      {item.fromUser?.user?.firstName} {item.fromUser?.user?.lastName}
                    </UserName>
                  </TouchableOpacity>
                  <UserRate>
                    <StarRating
                      rating={2}
                      onChange={() => {
                        return null;
                      }}
                      starSize={18}
                    />
                    <Text style={styles.smallBlackLabel}>(25)</Text>
                  </UserRate>
                </UserInfoText>
              </UserInfo>
              
              <PostText>
                <Text style={styles.label}>Bid amount: </Text>{' '}
                <Text style={styles.smallBlackLabel}>{ `${Number(item.price)} AED`  }</Text>
              </PostText>
              <PostText>
                <Text style={styles.label}> {item.notes}</Text>{' '}
               </PostText>
               {account.id==cargoRequest.createBy.id? (
               <View style={styles.userBtnWrapper} >
                          <TouchableOpacity
                            style={styles.blueBtn}
                            onPress={() =>  updateBidStatus(item,'Approve')} >
                            <Text style={styles.blueBtnTxt}>  Approve   </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.yellowdBtn}
                            onPress={() => updateBidStatus(item,'Reject')}>
                            <Text style={styles.yellowdBtnTxt}>  Decline   </Text>
                          </TouchableOpacity>
                        </View>
                  ):(null)}
                  
              {account.id==item.fromUser.user.id? (
                 <View style={styles.userBtnWrapper} >
                        <TouchableOpacity
                        style={styles.yellowdBtn}
                        onPress={() => setDeleteBidModalVisible(true)}   >
                        <Text style={styles.yellowdBtnTxt}>  Delete   </Text>
                      </TouchableOpacity>
     </View>
                  ):(null)}       
                 {deleteBidModalVisible && (
                 <BidDeleteModal
                   navigation={navigation}
                   visible={deleteBidModalVisible}
                   setVisible={setDeleteBidModalVisible}
                   entity={item}
                   testID="bidDeleteModal"
                 />
               )}
              <PostTime>{moment(new Date(item.createDate)).fromNow()}</PostTime>

      
            </Card>
         
           ) ): null }   
      
 
            <PostText></PostText>

    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    cargoRequest: state.cargoRequests.cargoRequest,
    error: state.cargoRequests.errorOne,
    fetching: state.cargoRequests.fetchingOne,
    deleting: state.cargoRequests.deleting,
    errorDeleting: state.cargoRequests.errorDeleting,
    account: state.account.account

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoRequest: (id) => dispatch(CargoRequestActions.cargoRequestRequest(id)),
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    deleteCargoRequest: (id) => dispatch(CargoRequestActions.cargoRequestDeleteRequest(id)),
    resetCargoRequests: () => dispatch(CargoRequestActions.cargoRequestReset()),
    updateBid: (bid) => dispatch(BidActions.bidUpdateRequest(bid)),
    updateCargoRequest: (cargoRequest) => dispatch(CargoRequestActions.cargoRequestUpdateRequest(cargoRequest)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDetailScreen);
