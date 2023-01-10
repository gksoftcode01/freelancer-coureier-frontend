import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="StateProvince" onPress={() => navigation.navigate('StateProvince')} testID="stateProvinceEntityScreenButton" />
      <RoundedButton text="Country" onPress={() => navigation.navigate('Country')} testID="countryEntityScreenButton" />
      <RoundedButton text="City" onPress={() => navigation.navigate('City')} testID="cityEntityScreenButton" />
      <RoundedButton text="UserRate" onPress={() => navigation.navigate('UserRate')} testID="userRateEntityScreenButton" />
      <RoundedButton text="ItemTypes" onPress={() => navigation.navigate('ItemTypes')} testID="itemTypesEntityScreenButton" />
      <RoundedButton text="AppUser" onPress={() => navigation.navigate('AppUser')} testID="appUserEntityScreenButton" />
      <RoundedButton text="Flight" onPress={() => navigation.navigate('Flight')} testID="flightEntityScreenButton" />
      <RoundedButton
        text="CargoRequestStatus"
        onPress={() => navigation.navigate('CargoRequestStatus')}
        testID="cargoRequestStatusEntityScreenButton"
      />
      <RoundedButton text="CargoRequest" onPress={() => navigation.navigate('CargoRequest')} testID="cargoRequestEntityScreenButton" />
      <RoundedButton
        text="CargoRequestDetails"
        onPress={() => navigation.navigate('CargoRequestDetails')}
        testID="cargoRequestDetailsEntityScreenButton"
      />
      <RoundedButton text="Bid" onPress={() => navigation.navigate('Bid')} testID="bidEntityScreenButton" />
      <RoundedButton text="Ask" onPress={() => navigation.navigate('Ask')} testID="askEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
