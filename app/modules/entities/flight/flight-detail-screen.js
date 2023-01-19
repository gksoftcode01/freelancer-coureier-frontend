import React, { createRef } from 'react';
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import FlightActions from './flight.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FlightDeleteModal from './flight-delete-modal';
import styles from './flight-styles';
import CargoRequestActions from '../cargo-request/cargo-request.reducer';

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
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';

import moment from 'moment/min/moment-with-locales';
import AskDeleteModal from '../ask/ask-delete-modal';
import AskActions from '../ask/ask.reducer';

function FlightDetailScreen(props) {
  const { route, getFlight, navigation, flight, fetching, error,account,cargoRequestList, getAllCargoRequests,deleteAsk ,updateAsk} = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = flight?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();
  const [deleteAskModalVisible, setdeleteAskModalVisible] = React.useState(false);
  const [addAskModalVisible, setAddAskModalVisible] = React.useState(false);
  const [askToDelete, setAskToDelete] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  
  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Flight');
      } else {
        setDeleteModalVisible(false);
        getFlight(routeEntityId);
        getAllCargoRequests({ page: page - 1, sort, size , createBy :account.id , statusId : 1 });
      }
    }, [routeEntityId, getFlight, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Flight.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const notesRef = createRef();
  const priceRef = createRef();
  const cargoRequestRef = createRef();

  const formValueToEntity = (value) => {
    const entity = {
      id: value.id ?? null,
      notes: value.notes ?? 'Please check my request',
      price: value.price ?? null,
      status: 'New',
      cargoRequestId :   value.cargoRequest ,
    };
    entity.fromUser = { id: account.id };
    entity.flight = { id: routeEntityId };
    console.log(entity);
    return entity;
  };

  const onSubmit = (data) => {
    updateAsk(formValueToEntity(data));
    setAddAskModalVisible(false);
     setTimeout(() => {
      getFlight(routeEntityId);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="flightDetailScrollView" key={flight.id}>
      <Card key={flight.id}>
      {account.id == flight.createBy.id ? (
          <ControlIcons style={{ width: '100%', textAlign: 'right', padding: 0 }}>
            <Ionicons name="trash-outline" size={24} color={'red'} onPress={() => setDeleteModalVisible(true)} />
            {'  '}
            <Ionicons
              name="create-outline"
              size={24}
              color={'blue'}
              onPress={() => navigation.navigate('FlightEdit', { entityId })}
            />

            {deleteModalVisible && (
              <FlightDeleteModal
                navigation={navigation}
                visible={deleteModalVisible}
                setVisible={setDeleteModalVisible}
                entity={flight}
               />
            )}
          </ControlIcons>
        ) : flight.status == 'Available' ? (
          <ControlIcons style={{ width: '100%', textAlign: 'right', padding: 0 }}>
            <TouchableOpacity onPress={() => setAddAskModalVisible(true)}>
              <Text style={styles.blueBtnTxt}>
                {' '}
                Send Ask<Ionicons name="add-circle-outline" size={32} color={'blue'} />{' '}
              </Text>
            </TouchableOpacity>
          </ControlIcons>
        ) : null}

       <PostText>
      <Text style={styles.label}>Flight Date: </Text>
       <Text  >  { moment(new Date(flight.flightDate)).format('MMMM Do YYYY, h:mm a') } </Text>  
      </PostText>
      <PostText>
      <Text style={styles.label}>Max Weight: </Text>
      <Text testID="maxWeight">{flight.maxWeight}</Text>
      </PostText> 
      <PostText>
      <Text style={styles.label}>Budget: </Text>
      <Text testID="budget">{flight.budget}</Text>
      </PostText> 
   
      <PostText>
      <Text style={styles.label}>Create Date: </Text>
       <Text  >  { moment(new Date(flight.createDate)).format('MMMM Do YYYY, h:mm a') } </Text>  
      </PostText>

        <PostText>
      <Text style={styles.label}>ToDoorAvailable: </Text>
      <Text testID="toDoorAvailable">{String(flight.toDoorAvailable)}</Text>
      </PostText>

      <PostText>
      <Text style={styles.label}>Status: </Text>
      <Text testID="status">{flight.status}</Text>
      </PostText>

      <PostText>
      <Text style={styles.label}>From Country: </Text>
      <Text testID="fromCountry">{String(flight.fromCountry ? flight.fromCountry.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>To Country: </Text>
      <Text testID="toCountry">{String(flight.toCountry ? flight.toCountry.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>From State: </Text>
      <Text testID="fromState">{String(flight.fromState ? flight.fromState.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>To State: </Text>
      <Text testID="toState">{String(flight.toState ? flight.toState.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>From City: </Text>
      <Text testID="fromCity">{String(flight.fromCity ? flight.fromCity.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>To City: </Text>
      <Text testID="toCity">{String(flight.toCity ? flight.toCity.name : '')}</Text>
      </PostText>
      <PostText>
      <Text style={styles.label}>Available Item Types: </Text>
      {flight.availableItemTypes?.length>0?(<View style={styles.flexRow}> 
                         {flight.availableItemTypes.map((entity, index) => (
          <>
          <Text style={styles.backgroundlabel} key={index} >
            {String(entity.name || ' ')}   
          </Text>
          {' '}
          </>
        ))}    </View> ):null}
        
     
</PostText>
<PostText>
<Text style={styles.label}>Notes: </Text>
      <Text testID="notes">{flight.notes}</Text>
</PostText>
 
      <PostText></PostText>
      </Card>

      {  flight.asks?.length > 0
        ? flight.asks.map((item, index) => ( 
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
                      rating={item.fromUser?.avgRateClient}
                      onChange={() => {
                        return null;
                      }}
                      starSize={18}
                    />
                    <Text style={styles.smallBlackLabel}>({item.fromUser?.totalRateClient})</Text>
                  </UserRate>
                </UserInfoText>
              </UserInfo>

              <PostText>
                <Text style={styles.label}>Ask amount: </Text>
                 <Text style={styles.smallBlackLabel}>{`${Number(item.price)} AED`}</Text>
              </PostText>
              <PostText>
                <Text style={styles.label}> {item.notes||item.notes==''?'Please check my request':item.notes}</Text>{' '}
              </PostText>
              <View>
              <TouchableOpacity onPress={() => 
              
                 props.navigation.navigate('Cargo', {
                  screen: 'CargoRequestDetail',
                  params: { entityId: item.cargoRequestId },
                }
                                     )}>

                  <PostText>
                       <Text style={styles.purpleLabel}> {'>>Click here to view the courier request<<'} </Text>{' '}
                      </PostText>
                  </TouchableOpacity>
              </View>
             <PostTime>{moment(new Date(item.createDate)).fromNow()}</PostTime>
            </Card>
          ))
        : null}


 

      <Modal animationType="slide" transparent={true} visible={addAskModalVisible}>
        <KeyboardAwareScrollView
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.paddedScrollView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Form onSubmit={onSubmit} ref={formRef}>
                <FormField name="price" ref={priceRef} label="Ask amount" placeholder="Enter ask amount (AED)" inputType="number" />

                <FormField
                  name="notes"
                  ref={notesRef}
                  label="Notes"
                  testID="notesInput"
                  inputType="text"
                  autoCapitalize="none"
                  value="Please check my request"
                  onSubmitEditing={() => priceRef.current?.focus()}
                />
                   <FormField
              name="cargoRequest"
              inputType="select-one"
              ref={cargoRequestRef}
              listItems={cargoRequestList}
              listItemLabelField="id"
              label="Courier Request number"
              placeholder="Choose"
              required="true"
              />

                <View style={[styles.flexRow]}>
                <View style={styles.userBtnWrapper}>
                      <TouchableHighlight
                    style={[styles.openButton, styles.cancelButton]}
                    onPress={() => {
                      setAddAskModalVisible(false);
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                        {cargoRequestList.length>0?(
                                    <FormButton title={'Save'} />

                        ):(
                          <TouchableHighlight
                           onPress={ navigate('CargoRequestEdit', { id: undefined })}>
                          <Text style={styles.textStyle}>Please create Courier request</Text>
                        </TouchableHighlight>  
                        )}
                  </View>
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={deleteAskModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={[styles.flex, styles.flexRow]}>
              <Text style={styles.modalText}>Delete Ask ?</Text>
            </View>
            <View style={[styles.flexRow]}>
              <TouchableHighlight
                style={[styles.openButton, styles.cancelButton]}
                onPress={() => {
                  setAskToDelete(0);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.openButton, styles.submitButton]}
                onPress={() => {
                  deleteAsk(askToDelete);
                  setAskToDelete(0);
                  setTimeout(() => {
                    getFlight(routeEntityId);
                  }, 1000);
                }}>
                <Text style={styles.textStyle}>Delete</Text>
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
    flight: state.flights.flight,
    error: state.flights.errorOne,
    fetching: state.flights.fetchingOne,
    deleting: state.flights.deleting,
    errorDeleting: state.flights.errorDeleting,
    account: state.account.account,
    cargoRequestList: state.cargoRequests.cargoRequestList,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFlight: (id) => dispatch(FlightActions.flightRequest(id)),
    getAllFlights: (options) => dispatch(FlightActions.flightAllRequest(options)),
    deleteFlight: (id) => dispatch(FlightActions.flightDeleteRequest(id)),
    resetFlights: () => dispatch(FlightActions.flightReset()),
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    updateAsk: (ask) => dispatch(AskActions.askUpdateRequest(ask)),
    deleteAsk: (id) => dispatch(AskActions.askDeleteRequest(id)),


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetailScreen);
