import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CargoRequestActions from './cargo-request.reducer';
import CargoRequestStatusActions from '../cargo-request-status/cargo-request-status.reducer';
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
import styles from './cargo-request-styles';
import { Formik, Field, ErrorMessage,  useFormikContext } from "formik";

function CargoRequestEditScreen(props) {
  const {
    getCargoRequest,
    updateCargoRequest,
    route,
    cargoRequest,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllCargoRequestStatuses,
    cargoRequestStatusList,
    getAllAppUsers,
    appUserList,
    getAllCountries,
    countryList,
    getAllStateProvinces,
    stateProvinceList,
    getAllCities,
    cityList,
    getAllItemTypes,
    itemTypesList,
    account
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    console.log("here");
    if (!isNewEntity) {
         getCargoRequest(route.params.entityId);
     } else {
      reset();
    }
  }, [isNewEntity, getCargoRequest, route, reset]);

  React.useEffect(() => {
    console.log("here");
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setisFrom(1);
      getAllStateProvinces({countryId : cargoRequest.fromCountry.id});
      if( cargoRequest.fromState)
        getAllCities({stateId : cargoRequest.fromState.id});


      setisFrom(0);
      getAllStateProvinces({countryId : cargoRequest.toCountry.id});
      if( cargoRequest.toState)
        getAllCities({stateId : cargoRequest.toState.id});

      setisFrom(-1);  
       setFormValue(entityToFormValue(cargoRequest));
     }
  }, [cargoRequest, fetching,getAllStateProvinces,getAllCities, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    console.log("here");
    getAllCargoRequestStatuses();
//    if(countryList.length == 0)
          getAllCountries();
    getAllItemTypes();
    
  }, [getAllCargoRequestStatuses, getAllCountries, getAllItemTypes]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('CargoRequestDetail', { entityId: cargoRequest?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCargoRequest(formValueToEntity(data));



  const formRef = createRef();
  const budgetRef = createRef();
  const isToDoorRef = createRef();

  const weightRef = createRef();
  const widthRef = createRef();
  const lengthRef = createRef();
  const heightRef = createRef();
  const descriptionRef = createRef();

  const fromCountryRef = createRef();
  const toCountryRef = createRef();
  const fromStateRef = createRef();
  const toStateRef = createRef();
  const fromCityRef = createRef();
  const toCityRef = createRef();
  const reqItemTypesRef = createRef();


  const [stateListFrom, setStateListFrom] = React.useState([]);
  const [stateListTo, setStateListTo] = React.useState([]);
  const [cityListFrom, setCityListFrom] = React.useState([]);
  const [cityListTo, setCityListTo] = React.useState([]);
     
const [fromCountry, setfromCountry] = React.useState(0);
const [toCountry, setToCountry] = React.useState(0);


const [fromState, setFromState] = React.useState(0);
const [toState, setToState] = React.useState(0);

const [isFrom, setisFrom] = React.useState(-1);


React.useEffect(() => {
  console.log("here");
  if(isFrom==1){
       setStateListFrom(stateProvinceList);
       setisFrom(-1);
  }
  if(isFrom==0){
    setStateListTo(stateProvinceList);
    setisFrom(-1);
}
}, [stateProvinceList]);
React.useEffect(() => {
  console.log("here");
  if(fromCountry>0){
  console.log("from country", fromCountry ); 
  getAllStateProvinces({countryId : fromCountry});
  setisFrom(1);
  }
}, [
  fromCountry
]);
React.useEffect(() => {
  console.log("here");
  if(toCountry>0){
  console.log("to country", toCountry ); 
  getAllStateProvinces({countryId : toCountry});
  setisFrom(0);
  }
}, [
  toCountry
]);


React.useEffect(() => {
  console.log("here");
  if(isFrom==1){
       setCityListFrom(cityList);
       setisFrom(-1);
  }
  if(isFrom==0){
    setCityListTo(cityList);
    setisFrom(-1);
}
}, [cityList]);

React.useEffect(() => {
  console.log("here");
  if(fromState>0){
  console.log("from state", fromState ); 
  getAllCities({stateId : fromState});
  setisFrom(1);
  }
}, [
  fromState
]);
React.useEffect(() => {
  console.log("here");
  if(toState>0){
  console.log("to state", toState ); 
  getAllCities({stateId : toState});
  setisFrom(0);
  }
}, [
  toState
]);


const Logger = () => {
  const formik = useFormikContext();

  React.useEffect(() => {
    console.log("here");
    const tmp =formik.values.fromCountry||0 ;
    if(tmp!==fromCountry)
      setfromCountry(tmp);
   }, [
    formik.values.fromCountry 
   ]);

   React.useEffect(() => {
    console.log("here");
    const tmp =formik.values.toCountry||0 ;
    if(tmp!==toCountry)
    setToCountry(tmp);
 }, [
  formik.values.toCountry 
 ]);

 React.useEffect(() => {
  console.log("here");
  const tmp =formik.values.fromState||0 ;
  if(tmp!==fromState)
      setFromState(tmp);
   }, [
    formik.values.fromState 
   ]);

   React.useEffect(() => {
    console.log("here");
    const tmp =formik.values.toState||0 ;
    if(tmp!==toState)
    setToState(tmp);
 }, [
  formik.values.toState 
 ]);

  return null;
};
// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    budget: value.budget ?? null,
    isToDoor: value.isToDoor ?? null,
    createDate: value.createDate ?? null,
    agreedPrice: value.agreedPrice ?? null,
    
    weight: value.weight ?? null,
    width: value.width ?? null,
    length: value.length ?? null,
    height: value.height ?? null,
    description: value.description ?? null,

    fromCountry: value.fromCountry && value.fromCountry.id ? value.fromCountry.id : null,
    toCountry: value.toCountry && value.toCountry.id ? value.toCountry.id : null,
    fromState: value.fromState && value.fromState.id ? value.fromState.id : null,
    toState: value.toState && value.toState.id ? value.toState.id : null,
    fromCity: value.fromCity && value.fromCity.id ? value.fromCity.id : null,
    toCity: value.toCity && value.toCity.id ? value.toCity.id : null,
    reqItemTypes: value.reqItemTypes?.map((i) => i.id),
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    budget: value.budget ?? null,
    isToDoor: value.isToDoor === null ? false : Boolean(value.isToDoor),

    weight: value.weight ?? null,
    width: value.width ?? null,
    length: value.length ?? null,
    height: value.height ?? null,
    description: value.description ?? null,
  };
  if(!isNewEntity){
    entity.takenBy = cargoRequest.takenBy? cargoRequest.takenBy:null;
    entitycreateDate=cargoRequest.createDate ?? null;
    entity.agreedPrice= cargoRequest.agreedPrice ?? null;
  }
  entity.createBy = cargoRequest?.createBy?account.id:null;
  entity.status = cargoRequest?.status?cargoRequest.status:1;

  entity.fromCountry = value.fromCountry ? { id: value.fromCountry } : null;
  entity.toCountry = value.toCountry ? { id: value.toCountry } : null;
  entity.fromState = value.fromState ? { id: value.fromState } : null;
  entity.toState = value.toState ? { id: value.toState } : null;
  entity.fromCity = value.fromCity ? { id: value.fromCity } : null;
  entity.toCity = value.toCity ? { id: value.toCity } : null;
  entity.reqItemTypes = value.reqItemTypes.map((id) => ({ id }));
  return entity;
};
if (fetching) {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
}
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="cargoRequestEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}   
          >
            <Logger />
            <FormField
              name="weight"
              ref={weightRef}
              label="Weight (Kg)"
               inputType="number"
             />
            <FormField
              name="length"
              ref={lengthRef}
              label="Length (CM)"
              inputType="number"
             />
              <FormField
              name="width"
              ref={widthRef}
              label="Width (CM)"
              inputType="number"
             />
              <FormField
              name="height"
              ref={heightRef}
              label="Height (CM)"
               testID="budgetInput"
              inputType="number"
             />
            

            <FormField
              name="description"
              ref={descriptionRef}
              label="Description"
               inputType="text"
             />  
            <FormField
              name="budget"
              ref={budgetRef}
              label="Budget (AED)"
              placeholder="Enter Budget"
              testID="budgetInput"
              inputType="number"
             />
            <FormField
              name="isToDoor"
              ref={isToDoorRef}
              label="Is To Door"
              placeholder="Enter Is To Door"
              testID="isToDoorInput"
              inputType="boolean"
             />
               <FormField
              name="fromCountry"
              inputType="select-one"
              ref={fromCountryRef}
              listItems={countryList}
              listItemLabelField="name"
              label="From Country"
              placeholder="Select From Country"
              testID="countrySelectInput"
 
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
             />
            <FormField
              name="fromState"
              inputType="select-one"
              ref={fromStateRef}
              listItems={stateListFrom}
              listItemLabelField="name"
              label="From State"
              placeholder="Select From State"
              testID="stateProvinceSelectInput"
             />
            <FormField
              name="toState"
              inputType="select-one"
              ref={toStateRef}
              listItems={stateListTo}
              listItemLabelField="name"
              label="To State"
              placeholder="Select To State"
              testID="stateProvinceSelectInput"
             />
            <FormField
              name="fromCity"
              inputType="select-one"
              ref={fromCityRef}
              listItems={cityListFrom}
              listItemLabelField="name"
              label="From City"
              placeholder="Select From City"
              testID="citySelectInput"
             />
            <FormField
              name="toCity"
              inputType="select-one"
              ref={toCityRef}
              listItems={cityListTo}
              listItemLabelField="name"
              label="To City"
              placeholder="Select To City"
              testID="citySelectInput"
             />
            <FormField
              name="reqItemTypes"
              inputType="select-multiple"
              ref={reqItemTypesRef}
              listItems={itemTypesList}
              listItemLabelField="name"
              label="Req Item Types"
              placeholder="Select Req Item Types"
              testID="itemTypesSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}


const mapStateToProps = (state) => {
  return {
    cargoRequestStatusList: state.cargoRequestStatuses.cargoRequestStatusList ?? [],
    appUserList: state.appUsers.appUserList ?? [],
    countryList: state.countries.countryList ?? [],
    stateProvinceList: state.stateProvinces.stateProvinceList ?? [],
    cityList: state.cities.cityList ?? [],
    itemTypesList: state.itemTypes.itemTypesList ?? [],
    cargoRequest: state.cargoRequests.cargoRequest,
    fetching: state.cargoRequests.fetchingOne,
    updating: state.cargoRequests.updating,
    updateSuccess: state.cargoRequests.updateSuccess,
    errorUpdating: state.cargoRequests.errorUpdating,
    account: state.account.account,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCargoRequestStatuses: (options) => dispatch(CargoRequestStatusActions.cargoRequestStatusAllRequest(options)),
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    getAllStateProvinces: (options) => dispatch(StateProvinceActions.stateProvinceAllRequest(options)),
    getAllCities: (options) => dispatch(CityActions.cityAllRequest(options)),
    getAllItemTypes: (options) => dispatch(ItemTypesActions.itemTypesAllRequest(options)),
    getCargoRequest: (id) => dispatch(CargoRequestActions.cargoRequestRequest(id)),
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    updateCargoRequest: (cargoRequest) => dispatch(CargoRequestActions.cargoRequestUpdateRequest(cargoRequest)),
    reset: () => dispatch(CargoRequestActions.cargoRequestReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestEditScreen);
