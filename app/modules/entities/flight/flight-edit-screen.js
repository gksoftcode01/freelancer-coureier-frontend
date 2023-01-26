import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFormikContext } from 'formik';

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
import { values } from 'lodash';
 
const FlightStatus = [
  {
    label: 'Available',
    value: 'Available',
  },
  {
    label: 'FullyBooked',
    value: 'FullyBooked',
  },
  {
    label: 'Canceled',
    value: 'Canceled',
  },
];

function FlightEditScreen(props) {
  const {
    getFlight,
    updateFlight,
    route,
    flight,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllCountries,
    countryList,
    getAllStateProvinces,
    stateProvinceList,
    getAllCities,
    cityList,
    getAllItemTypes,
    itemTypesList,
    account,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getFlight(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getFlight, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {

      setisFrom(1);
      getAllStateProvinces({countryId : flight.fromCountry.id});
      if( flight.fromState)
        getAllCities({stateId : flight.fromState.id});


      setisFrom(0);
      getAllStateProvinces({countryId : flight.toCountry.id});
      if( flight.toState)
        getAllCities({stateId : flight.toState.id});

      setisFrom(-1);  
      setFormValue(entityToFormValue(flight));

    }
  }, [flight, fetching,getAllStateProvinces,getAllCities,  isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    if (countryList.length == 0)
     getAllCountries();
    getAllItemTypes();
    // getStateProvinces(231);
    // getStateProvincesTo(65);
    // getCities(3391);
    // getCitiesTo(3223);
  }, [getAllCountries, getAllItemTypes]);

  
  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('FlightDetail', { entityId: flight?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateFlight(formValueToEntity(data));

  const [fromCountry, setfromCountry] = React.useState(0);
  const [toCountry, setToCountry] = React.useState(0);
  
  
  const [fromState, setFromState] = React.useState(0);
  const [toState, setToState] = React.useState(0);
  
  const [isFrom, setisFrom] = React.useState(-1);
  
  const [stateProvinceListFrom, setStateProvinceListFrom] = React.useState([]);
  const [stateProvinceListTo, setStateProvinceListTo] = React.useState([]);

  const [cityListFrom, setCityListFrom] = React.useState([]);
  const [cityListTo, setCityListTo] = React.useState([]);


  React.useEffect(() => {
    console.log("here");
    if(isFrom==1){
         setStateProvinceListFrom(stateProvinceList);
         setisFrom(-1);
    }
    if(isFrom==0){
      setStateProvinceListTo(stateProvinceList);
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

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const flightDateRef = createRef();
  const maxWeightRef = createRef();
  const notesRef = createRef();
  const budgetRef = createRef();
  const createDateRef = createRef();
  const toDoorAvailableRef = createRef();
  const statusRef = createRef();
  const createByRef = createRef();
  const fromCountryRef = createRef();
  const toCountryRef = createRef();
  const fromStateRef = createRef();
  const toStateRef = createRef();
  const fromCityRef = createRef();
  const toCityRef = createRef();
  const availableItemTypesRef = createRef();
 
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="flightEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
               <Logger />
            <FormField
              name="flightDate"
              ref={flightDateRef}
              label="Flight Date"
              placeholder="Enter Flight Date"
              testID="flightDateInput"
              inputType="datetime"
              required="true"
              onSubmitEditing={() => maxWeightRef.current?.focus()}
            />
            <FormField
              name="maxWeight"
              ref={maxWeightRef}
              label="Max Weight"
              placeholder="Enter Max Weight"
              testID="maxWeightInput"
              inputType="number"
              onSubmitEditing={() => notesRef.current?.focus()}
            />
            <FormField
              name="notes"
              ref={notesRef}
              label="Notes"
              placeholder="Enter Notes"
              testID="notesInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => budgetRef.current?.focus()}
            />
            <FormField
              name="budget"
              ref={budgetRef}
              label="Budget"
              placeholder="Enter Budget"
              testID="budgetInput"
              inputType="number"
              onSubmitEditing={() => createDateRef.current?.focus()}
            />
            <FormField
              name="createDate"
              ref={createDateRef}
              label="Create Date"
              placeholder="Enter Create Date"
              testID="createDateInput"
              inputType="datetime"
              onSubmitEditing={() => toDoorAvailableRef.current?.focus()}
              hidden="true"
            />
            <FormField
              name="toDoorAvailable"
              ref={toDoorAvailableRef}
              label="To Door Available"
              placeholder="Enter To Door Available"
              testID="toDoorAvailableInput"
              inputType="boolean"
            />
            <FormField
              name="status"
              ref={statusRef}
              label="Status"
              placeholder="Enter Status"
              testID="statusInput"
              inputType="select-one"
              listItems={FlightStatus}
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
              name="fromState"
              inputType="select-one"
              ref={fromStateRef}
              listItems={stateProvinceListFrom}
              listItemLabelField="name"
              label="From State"
              placeholder="Select From State"
              testID="stateProvinceSelectInput"
            />
            <FormField
              name="toState"
              inputType="select-one"
              ref={toStateRef}
              listItems={stateProvinceListTo}
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
              name="availableItemTypes"
              inputType="select-multiple"
              ref={availableItemTypesRef}
              listItems={itemTypesList}
              listItemLabelField="name"
              label="Available Item Types"
              placeholder="Select Available Item Types"
              testID="itemTypesSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  console.log(value);
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    flightDate: value.flightDate ?? null,
    maxWeight: value.maxWeight ?? null,
    notes: value.notes ?? null,
    budget: value.budget ?? null,
    createDate: value.createDate ?? null,
    toDoorAvailable: value.toDoorAvailable ?? null,
    status: value.status ?? 'Available',
    createBy: value.createBy && value.createBy.id ? value.createBy.id : null,
    fromCountry: value.fromCountry && value.fromCountry.id ? value.fromCountry.id : null,
    toCountry: value.toCountry && value.toCountry.id ? value.toCountry.id : null,
    fromState: value.fromState && value.fromState.id ? value.fromState.id : null,
    toState: value.toState && value.toState.id ? value.toState.id : null,
    fromCity: value.fromCity && value.fromCity.id ? value.fromCity.id : null,
    toCity: value.toCity && value.toCity.id ? value.toCity.id : null,
    availableItemTypes: value.availableItemTypes?.map((i) => i.id),
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    flightDate: value.flightDate ?? null,
    maxWeight: value.maxWeight ?? null,
    notes: value.notes ?? null,
    budget: value.budget ?? null,
    createDate: value.createDate ?? null,
    toDoorAvailable: value.toDoorAvailable === null ? false : Boolean(value.toDoorAvailable),
    status: value.status ?? null,
  };
  entity.createBy = account.id;
  entity.fromCountry = value.fromCountry ? { id: value.fromCountry } : null;
  entity.toCountry = value.toCountry ? { id: value.toCountry } : null;
  entity.fromState = value.fromState ? { id: value.fromState } : null;
  entity.toState = value.toState ? { id: value.toState } : null;
  entity.fromCity = value.fromCity ? { id: value.fromCity } : null;
  entity.toCity = value.toCity ? { id: value.toCity } : null;
  entity.availableItemTypes = value.availableItemTypes.map((id) => ({ id }));
  return entity;
};

const mapStateToProps = (state) => {
  return {
    countryList: state.countries.countryList ?? [],
    stateProvinceList: state.stateProvinces.stateProvinceList ?? [],
     cityList: state.cities.cityList ?? [],
    itemTypesList: state.itemTypes.itemTypesList ?? [],
    flight: state.flights.flight,
    fetching: state.flights.fetchingOne,
    updating: state.flights.updating,
    updateSuccess: state.flights.updateSuccess,
    errorUpdating: state.flights.errorUpdating,
    account: state.account.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    getAllStateProvinces: (options) => dispatch(StateProvinceActions.stateProvinceAllRequest(options)),

    getAllCities: (options) => dispatch(CityActions.cityAllRequest(options)),
    getAllItemTypes: (options) => dispatch(ItemTypesActions.itemTypesAllRequest(options)),
    getFlight: (id) => dispatch(FlightActions.flightRequest(id)),
    getAllFlights: (options) => dispatch(FlightActions.flightAllRequest(options)),
    updateFlight: (flight) => dispatch(FlightActions.flightUpdateRequest(flight)),
    reset: () => dispatch(FlightActions.flightReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightEditScreen);
