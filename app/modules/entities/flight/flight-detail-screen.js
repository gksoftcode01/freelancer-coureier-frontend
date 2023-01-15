import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import FlightActions from './flight.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FlightDeleteModal from './flight-delete-modal';
import styles from './flight-styles';
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

function FlightDetailScreen(props) {
  const { route, getFlight, navigation, flight, fetching, error,account } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = flight?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Flight');
      } else {
        setDeleteModalVisible(false);
        getFlight(routeEntityId);
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
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="flightDetailScrollView" key={flight.id}>
      <Card key={flight.id}>
      <PostText></PostText>
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
{account.id==flight.createBy.id? ( 
      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('FlightEdit', { entityId })}
          accessibilityLabel={'Flight Edit Button'}
          testID="flightEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Flight Delete Button'}
          testID="flightDeleteButton"
        />
        {deleteModalVisible && (
          <FlightDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={flight}
            testID="flightDeleteModal"
          />
        )}
      </View>
      ):(
        <View>
           
        </View>
      )}
      <PostText></PostText>
      </Card>
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
    account: state.account.account
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFlight: (id) => dispatch(FlightActions.flightRequest(id)),
    getAllFlights: (options) => dispatch(FlightActions.flightAllRequest(options)),
    deleteFlight: (id) => dispatch(FlightActions.flightDeleteRequest(id)),
    resetFlights: () => dispatch(FlightActions.flightReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightDetailScreen);
