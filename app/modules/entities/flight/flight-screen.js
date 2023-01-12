import React from 'react';
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
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../../../shared/themes/MessageStyles';
import moment from 'moment/min/moment-with-locales';

function FlightScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { flight, flightList, getAllFlights, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Flight entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchFlights();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [flight, fetchFlights]),
  );

  const renderRow = ({ item }) => {
     return (
      <TouchableOpacity onPress={() => props.navigation.navigate('FlightDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>From: {item.fromCountry.name} to: {item.toCountry.name}  </Text>
           <Text style={styles.label}>{  new Date(item.flightDate).toLocaleString() }</Text>  
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
    getAllFlights({ page: page - 1, sort, size });
  }, [getAllFlights, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchFlights();
  };
  return (
    <View style={styles.container}  testID="flightScreen">
      {/* <FlatList
        contentContainerStyle={styles.listContent}
        data={flightList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      /> */}
        <FlatList
              data={flightList}
              keyExtractor={(item) => item.id}    
              initialNumToRender={oneScreensWorth}
              onEndReached={handleLoadMore}
              ListEmptyComponent={renderEmpty} 
              renderItem={({item}) => (
                <Card
                onPress={() => props.navigation.navigate('FlightDetail', { entityId: item.id })} >
                  <UserInfo>
                    <UserImgWrapper>
                      <UserImg
                        source={
                          item.toUserImg
                            ? item.toUserImg
                            : require('../../../../assets/avatar.png')
                        }
                      />
                    </UserImgWrapper>
                    <TextSection>
                    <MessageText>
                      <Text style={styles.whiteLabel}>From: {item.fromCountry.name} to: {item.toCountry.name}  </Text>
                         <Text style={styles.label}>  { moment(new Date(item.flightDate)).format('MMMM Do YYYY, h:mm a') }</Text>  
                        </MessageText>

                      <UserInfoText>
                        <UserName>{item.createBy.user.firstName }</UserName>
                        <PostTime>     {  moment(new Date(item.createDate)).fromNow()  }</PostTime>
                      </UserInfoText>
                      
                    </TextSection>
                  </UserInfo>
                </Card>
              )}
            />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFlights: (options) => dispatch(FlightActions.flightAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightScreen);
