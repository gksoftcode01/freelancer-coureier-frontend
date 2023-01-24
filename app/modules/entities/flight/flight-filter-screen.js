import React, { createRef ,useContext,useState} from 'react';
import { ActivityIndicator, ScrollView, Text, View, TouchableOpacity, Modal, TouchableHighlight, TextInput } from 'react-native';
import { connect } from 'react-redux';

import FlightActions from './flight.reducer';
import AppUserActions from '../app-user/app-user.reducer';
import CountryActions from '../country/country.reducer';
import StateProvinceActions from '../state-province/state-province.reducer';
import CityActions from '../city/city.reducer';
import ItemTypesActions from '../item-types/item-types.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
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
  itemType,
} from '../../../shared/themes/FeedStyles';


function FlightFilterScreen(props) {
  const {     navigation, filterentity, flightFilter,  getAllCountries ,countryList} = props;
  const [isSubmit,setIssubmit] = useState(false);
  React.useEffect(() => {
    if(countryList.length == 0){
      console.log("get countires  ");
          getAllCountries();
    }
      const vv = entityToFormValue(filterentity);
      setFormValue(vv);
    
   }, [  getAllCountries]);

   React.useEffect(() => {
       console.log(filterentity);
       if(isSubmit)
          navigation.navigate("Flight");      
    }, [  filterentity  ]);
   
  const onSubmit = (data) => {
    const entity = formValueToEntity(data); 
    setIssubmit(true);

     flightFilter(entity)  ;
     };

  const formRef = createRef();

  const fromCountryRef = createRef();
  const toCountryRef = createRef();
 const isMineRef = createRef();
 const isAskSentRef = createRef();

 const formValueToEntity = (value) => {
    const entity = { 
     isMine : value.isMine  ?? false,
     isAskSent : value.isAskSent ?? false,
   };
   entity.fromCountry = value.fromCountry ? { id: value.fromCountry } : null;
   entity.toCountry = value.toCountry ? { id: value.toCountry } : null;
  
   return entity;
 };

  const [formValue, setFormValue] = React.useState();

  const entityToFormValue = (value) => {
    if (!value) {
      return {};
    }

    return {
      isMine: value.isMine ?? false,
      isAskSent: value.isAskSent ?? false,
      fromCountry: value.fromCountry && value.fromCountry.id ? value.fromCountry.id : null,
      toCountry: value.toCountry && value.toCountry.id ? value.toCountry.id : null,
      
    };
  };
   

 

  return (
    
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="flightEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
           {formValue && (
      <Form onSubmit={onSubmit} ref={formRef} initialValues={formValue} >
              <FormField
              name="fromCountry"
              inputType="select-one"
              ref={fromCountryRef}
              listItems={countryList}
              listItemLabelField="name"
              label="From Country"
              placeholder="Select From Country"
              testID="countrySelectInput"
              required="true"
            />
            <FormField
              name="toCountry"
              inputType="select-one"
              ref={toCountryRef}
              listItems={countryList}
              listItemLabelField="name"
              label="To Country"
              placeholder="Select To Country"
              testID="countrySelectInput"
              required="true"
            />
               <FormField
              name="isMine"
              ref={isMineRef}
              label="Created by me"
                inputType="boolean"
            />
                <FormField
              name="isAskSent"
              ref={isAskSentRef}
              label="My asks"
                inputType="boolean"
            />
                  
                 
                  <FormButton title={'Save'}  />
               </Form>
           )}

    </KeyboardAwareScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    countryList: state.countries.countryList ?? [],
    filterentity: state.flights.filterentity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    flightFilter:(filterentity)=> dispatch(FlightActions.flightFilter(filterentity)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightFilterScreen);
