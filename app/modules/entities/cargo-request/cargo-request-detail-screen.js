import React, { createRef } from 'react';
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native';
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
  ControlIcons,
} from '../../../shared/themes/FeedStyles';
import BidActions from '../bid/bid.reducer';

import moment from 'moment/min/moment-with-locales';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
import BidDeleteModal from '../bid/bid-delete-modal';
import { Colors } from '../../../shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import UserRateActions from '../user-rate/user-rate.reducer';
import { Notifier, Easing } from 'react-native-notifier';

function CargoRequestDetailScreen(props) {
  const {
    route,
    getCargoRequest,
    updateCargoRequest,
    errorUpdating,
    updateSuccess,
    navigation,
    cargoRequest,
    fetching,
    error,
    account,
    updateBid,
    testID,
    deleteBid,
    updateUserRate,
    getAllUserRates,
    userRateList,
     
  } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [deleteBidModalVisible, setDeleteBidModalVisible] = React.useState(false);
  const [addBidModalVisible, setAddBidModalVisible] = React.useState(false);
  const [bidToDelete, setBidToDelete] = React.useState(0);
  const [statusModalVisible, setStatusModalVisible] = React.useState(false);
  const [bidToChange, setBidToChange] = React.useState(null);
  const [bidStatus, setBidStatus] = React.useState('');
  // prevents display of stale reducer data
  const entityId = cargoRequest?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  const [ratingIdCourier, setRatingIdCourier] = React.useState(null);
  const [ratingCourier, setRatingCourier] = React.useState(0);
  const [userNotesCourier, onChangeTextCourier] = React.useState('');

  const [ratingIdRequester, setRatingIdRequester] = React.useState(null);
  const [ratingRequester, setRatingRequester] = React.useState(0);
  const [userNotesRequester, onChangeTextRequester] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);
  useFocusEffect(
    React.useCallback(() => {
      if (bidToDelete > 0) setDeleteBidModalVisible(true);
      else setDeleteBidModalVisible(false);
    }, [bidToDelete]),
  );
  React.useEffect(() => {
    userRateList.forEach((userRate) => {
      if (userRate.isCourier == 1) {
        setRatingCourier(userRate.rate);
        onChangeTextCourier(userRate.note);
        setRatingIdCourier(userRate.id);
      } else if (userRate.isCourier == 0) {
        setRatingRequester(userRate.rate);
        onChangeTextRequester(userRate.note);
        setRatingIdRequester(userRate.id);
      }
    });
  }, [userRateList]);

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('CargoRequest');
      } else {
        setDeleteModalVisible(false);
        setDeleteBidModalVisible(false);

        getCargoRequest(routeEntityId);
        getAllUserRates({ page: page, sort, size , cargoId :routeEntityId });  
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

  const updateBidStatus = (bid, status) => {
    setBidToChange(bid);
    setBidStatus(status);
    setStatusModalVisible(true);
  };
  const confirmChange = () => {
    const item2 = Object.assign({}, bidToChange);
    item2.status = bidStatus;
    item2.cargoRequest = cargoRequest;
    updateBid(item2);
    if (bidStatus == 'Approve') {
      const cargoRequest2 = Object.assign({}, cargoRequest);
      console.log(cargoRequest2);
      cargoRequest2.status = { id: 2 }; //finished
      cargoRequest2.agreedPrice = bidToChange.price;
      cargoRequest2.takenBy = { id: bidToChange.fromUser.id };
      updateCargoRequest(cargoRequest2);
    }
    setTimeout(() => {
      getCargoRequest(routeEntityId);
    }, 1000);

    setStatusModalVisible(false);
  };
  const formRef = createRef();
  const notesRef = createRef();
  const priceRef = createRef();

  const formValueToEntity = (value) => {
    const entity = {
      id: value.id ?? null,
      notes: value.notes ?? null,
      price: value.price ?? null,
      status: 'New',
    };
    entity.fromUser = { id: account.id };
    entity.cargoRequest = { id: cargoRequest.id };
    return entity;
  };

  const onSubmit = (data) => {
    updateBid(formValueToEntity(data));
    setAddBidModalVisible(false);
    getCargoRequest(routeEntityId);
  };

  const showNotify =()=>{
    if(updateSuccess){
      Notifier.showNotification({
        title: 'Rating',
        description: 'Saved successfully!',
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.bounce,
        onHidden: () => console.log('Hidden'),
        onPress: () => console.log('Press'),
        hideOnPress: false,
      });
    }
  }
  const saveRateCourier = () => {
    const entity = {
      id: ratingIdCourier,
      rate: ratingCourier ?? null,
      note: userNotesCourier ?? null,
      rateDate: moment.now(),
      isCourier: 1,
    };
    entity.cargoRequest = cargoRequest;
    entity.user = cargoRequest.takenBy;
    updateUserRate(entity);
    showNotify();
  };

  const saveRateRequester = () => {
    const entity = {
      id: ratingIdRequester,
      rate: ratingRequester ?? null,
      note: userNotesRequester ?? null,
      rateDate: moment.now(),

      isCourier: 0,
    };
    entity.cargoRequest = cargoRequest;
    entity.user = cargoRequest.createBy;
    updateUserRate(entity);
    showNotify();
  };

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
        {account.id == cargoRequest.createBy.id ? (
          <ControlIcons style={{ width: '100%', textAlign: 'right', padding: 0 }}>
            <Ionicons name="trash-outline" size={24} color={'red'} onPress={() => setDeleteModalVisible(true)} />
            {'  '}
            <Ionicons
              name="create-outline"
              size={24}
              color={'blue'}
              onPress={() => navigation.navigate('CargoRequestEdit', { entityId })}
            />

            {deleteModalVisible && (
              <CargoRequestDeleteModal
                navigation={navigation}
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                entity={cargoRequest}
                testID="cargoRequestDeleteModal"
              />
            )}
          </ControlIcons>
        ) : cargoRequest.status.id == 1 ? (
          <ControlIcons style={{ width: '100%', textAlign: 'right', padding: 0 }}>
            <TouchableOpacity onPress={() => setAddBidModalVisible(true)}>
              <Text style={styles.blueBtnTxt}>
                {' '}
                Add bid <Ionicons name="add-circle-outline" size={32} color={'blue'} />{' '}
              </Text>
            </TouchableOpacity>
          </ControlIcons>
        ) : null}

        <PostText>
          <Text style={styles.label}>Budget: </Text>
          <Text testID="budget">{cargoRequest.budget} (AED) </Text>
        </PostText>
        <PostText>
          <Text style={styles.label}>IsToDoor: </Text>
          <Text testID="isToDoor">{cargoRequest.isToDoor?"Yes":"No"}</Text>
        </PostText>
        <PostText>
          <Text style={styles.label}>CreateDate: </Text>
          <Text testID="createDate"> {moment(new Date(cargoRequest.createDate)).format('MMMM Do YYYY, h:mm a')}</Text>
        </PostText>

        <PostText>
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
          <Text style={styles.label}>weight : </Text>
          <Text>{cargoRequest.weight} KG</Text>
        </PostText>
        <PostText>
          <Text style={styles.label}>height : </Text>
          <Text>{cargoRequest.height} CM</Text>
        </PostText>
        <PostText>
          <Text style={styles.label}>width : </Text>
          <Text>{cargoRequest.width} CM</Text>
        </PostText>
        <PostText>
          <Text style={styles.label}>length : </Text>
          <Text>{cargoRequest.length} CM</Text>
        </PostText>
        <PostText>
          <Text style={styles.label}>Description : </Text>
          <Text>{cargoRequest.description}</Text>
        </PostText>

        

        <PostText>
          <Text style={styles.label}>Req Item Types: </Text>
          {cargoRequest.reqItemTypes?.length > 0 ? (
            <View style={styles.flexRow}>
              {cargoRequest.reqItemTypes.map((entity, index) => (
                <>
                  <Text style={styles.backgroundlabel} key={index}>
                    {String(entity.name || ' ')}
                  </Text>{' '}
                </>
              ))}{' '}
            </View>
          ) : null}
        </PostText>
        {cargoRequest.status.id == 2 ? (
          <>
            <View style={{ textAlign: 'center' }}>
              <Text style={styles.label} color={'red'}>
                This cargo request has been closed
              </Text>
            </View>
            <PostText>
              <Text style={styles.label}>Taken By: </Text>
              <Text>{String(cargoRequest.takenBy ? `${cargoRequest.takenBy?.firstName} ${cargoRequest.takenBy?.lastName}` : '')}</Text>
            </PostText>
            <PostText>
              <Text style={styles.label}>AgreedPrice: </Text>
              <Text testID="agreedPrice">{cargoRequest.agreedPrice} AED</Text>
            </PostText>
       
            {cargoRequest.createBy.id == account.id ? (
              <>
                <PostText>
                  <Text style={styles.label}> Please rate the freelance courier: </Text>
                </PostText>
                <View style={{ padding: '10' }}>
                  <StarRating rating={ratingCourier} onChange={setRatingCourier} starSize={24} />
                </View>
                <PostText>
                  <Text style={styles.label}>comments: </Text>
                </PostText>
                <View>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={400}
                    onChangeText={(text) => onChangeTextCourier(text)}
                    value={userNotesCourier}
                    style={{ padding: '10', width: '100%', border: '1px solid black' }}
                  />
                </View>

                <View style={styles.userBtnWrapper}>
                  <TouchableOpacity style={styles.blueBtn} onPress={() => saveRateCourier()}>
                    <Text style={styles.blueBtnTxt}> Save </Text>
                  </TouchableOpacity>
                </View>
                 
              </>
            ) :cargoRequest.takenBy.id == account.id ? (
              <>
                <PostText>
                  <Text style={styles.label}> Please rate the client: </Text>
                </PostText>
                <View style={{ padding: '10' }}>
                  <StarRating rating={ratingRequester} onChange={setRatingRequester} starSize={24} />
                </View>
                <PostText>
                  <Text style={styles.label}>comments: </Text>
                </PostText>
                <View>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={400}
                    onChangeText={(text) => onChangeTextRequester(text)}
                    value={userNotesRequester}
                    style={{ padding: '10', width: '100%', border: '1px solid black' }}
                  />
                </View>

                <View style={styles.userBtnWrapper}>
                  <TouchableOpacity style={styles.blueBtn} onPress={() => saveRateRequester()}>
                    <Text style={styles.blueBtnTxt}> Save </Text>
                  </TouchableOpacity>
                 </View>
             
              </>
            ) : null}
          </>
        ) : null}
      </Card>

      {/* <FlatList
        data={cargoRequest.bids} 
        keyExtractor={(item) => item.id}
         ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (  */}
      {cargoRequest.bids?.length > 0  /*cargoRequest.status != 1 && */
        ? cargoRequest.bids.map((item, index) => ( 
            <Card key={item.id}>
              <UserInfo>
                <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.fromUser.id })}>
                  <UserImg source={item.toUserImg ? item.toUserImg : require('../../../../assets/avatar3.jpg')} />
                </TouchableOpacity>
                <UserInfoText>
                  <TouchableOpacity onPress={() => props.navigation.navigate('AppUserDetail', { entityId: item.fromUser.id })}>
                    <UserName>
                      {item.fromUser?.firstName} {item.fromUser?.lastName}
                    </UserName>
                  </TouchableOpacity>
                  <UserRate>
                    <StarRating
                      rating={item.fromUser?.avgRateCourier}
                      onChange={() => {
                        return null;
                      }}
                      starSize={18}
                    />
                    <Text style={styles.smallBlackLabel}>({item.fromUser?.totalRateCourier})</Text>
                  </UserRate>
                </UserInfoText>
              </UserInfo>

              <PostText>
                <Text style={styles.label}>Bid amount: </Text> <Text style={styles.smallBlackLabel}>{`${Number(item.price)} AED`}</Text>
              </PostText>
              <PostText>
                <Text style={styles.label}> {item.notes}</Text>{' '}
              </PostText>
              {cargoRequest.status.id != 2 ? (
                <> 
              {item.status == 'New' && account.id == cargoRequest.createBy.id ? (
                <View style={styles.userBtnWrapper}>
                  <TouchableOpacity style={styles.blueBtn} onPress={() => updateBidStatus(item, 'Approve')}>
                    <Text style={styles.blueBtnTxt}> Approve </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.yellowdBtn} onPress={() => updateBidStatus(item, 'Reject')}>
                    <Text style={styles.yellowdBtnTxt}> Decline </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {item.status == 'New' && account.id == item.fromUser.id ? (
                <View style={styles.userBtnWrapper}>
                  <TouchableOpacity style={styles.yellowdBtn} onPress={() => setBidToDelete(item.id)}>
                    <Text style={styles.yellowdBtnTxt}> Delete </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
   </>
              ):(null)}
              {item.status != 'New' ? (
                <View style={styles.centeredView}>
                  <Text style={[{ color: item.status == 'Approve' ? Colors.jhipsterBlue : 'red' }, styles.label]}>
                    {item.status == 'Approve' ? 'Approved' : 'Rejected'}
                  </Text>
                </View>
              ) : null}
          
              <PostTime>{moment(new Date(item.createDate)).fromNow()}</PostTime>
            </Card>
          ))
        : null}
      <PostText></PostText>

      <Modal animationType="slide" transparent={true} visible={addBidModalVisible}>
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.paddedScrollView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Form onSubmit={onSubmit} ref={formRef}>
                <FormField name="price" ref={priceRef} label="bid amount" placeholder="Enter bid amount (AED)" inputType="number" />

                <FormField
                  name="notes"
                  ref={notesRef}
                  label="Notes"
                  placeholder="Enter Notes"
                  testID="notesInput"
                  inputType="text"
                  autoCapitalize="none"
                  onSubmitEditing={() => priceRef.current?.focus()}
                />

                <View style={[styles.flexRow]}>
                  <TouchableHighlight
                    style={[styles.openButton, styles.cancelButton]}
                    onPress={() => {
                      setAddBidModalVisible(false);
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>

                  <FormButton title={'Save'} />
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={deleteBidModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={[styles.flex, styles.flexRow]}>
              <Text style={styles.modalText}>Delete Bid ?</Text>
            </View>
            <View style={[styles.flexRow]}>
              <TouchableHighlight
                style={[styles.openButton, styles.cancelButton]}
                onPress={() => {
                  setBidToDelete(0);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.openButton, styles.submitButton]}
                onPress={() => {
                  deleteBid(bidToDelete);
                  setBidToDelete(0);
                  setTimeout(() => {
                    getCargoRequest(routeEntityId);
                  }, 1000);
                }}>
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={statusModalVisible}>
        <View testID={testID} style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={[styles.flex, styles.flexRow]}>
              <Text style={styles.modalText}>
                {' '}
                {bidStatus} {bidToChange?.fromUser?.firstName} bid ?
              </Text>
            </View>
            <View style={[styles.flexRow]}>
              <TouchableHighlight
                style={[styles.openButton, styles.cancelButton]}
                onPress={() => {
                  setStatusModalVisible(false);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={confirmChange}>
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
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
    account: state.account.account,
    //updateSuccess: state.cargoRequests.updateSuccess,
    errorUpdating: state.cargoRequests.errorUpdating,
    userRateList: state.userRates.userRateList,
    updateSuccess: state.userRates.updateSuccess,

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
    deleteBid: (id) => dispatch(BidActions.bidDeleteRequest(id)),
    updateUserRate: (userRate) => dispatch(UserRateActions.userRateUpdateRequest(userRate)),
    getAllUserRates: (options) => dispatch(UserRateActions.userRateAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDetailScreen);
