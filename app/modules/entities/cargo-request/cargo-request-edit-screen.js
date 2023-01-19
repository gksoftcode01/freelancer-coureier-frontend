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
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCargoRequest(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCargoRequest, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(cargoRequest));
    }
  }, [cargoRequest, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllCargoRequestStatuses();
    getAllAppUsers();
    getAllCountries();
    getAllStateProvinces();
    getAllCities();
    getAllItemTypes();
  }, [getAllCargoRequestStatuses, getAllAppUsers, getAllCountries, getAllStateProvinces, getAllCities, getAllItemTypes]);

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

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const budgetRef = createRef();
  const isToDoorRef = createRef();
  const createDateRef = createRef();
  const agreedPriceRef = createRef();
  const statusRef = createRef();
  const createByRef = createRef();
  const takenByRef = createRef();
  const fromCountryRef = createRef();
  const toCountryRef = createRef();
  const fromStateRef = createRef();
  const toStateRef = createRef();
  const fromCityRef = createRef();
  const toCityRef = createRef();
  const reqItemTypesRef = createRef();

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
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="budget"
              ref={budgetRef}
              label="Budget"
              placeholder="Enter Budget"
              testID="budgetInput"
              inputType="number"
              onSubmitEditing={() => isToDoorRef.current?.focus()}
            />
            <FormField
              name="isToDoor"
              ref={isToDoorRef}
              label="Is To Door"
              placeholder="Enter Is To Door"
              testID="isToDoorInput"
              inputType="boolean"
              onSubmitEditing={() => createDateRef.current?.focus()}
            />
            <FormField
              name="createDate"
              ref={createDateRef}
              label="Create Date"
              placeholder="Enter Create Date"
              testID="createDateInput"
              inputType="datetime"
              onSubmitEditing={() => agreedPriceRef.current?.focus()}
            />
            <FormField
              name="agreedPrice"
              ref={agreedPriceRef}
              label="Agreed Price"
              placeholder="Enter Agreed Price"
              testID="agreedPriceInput"
              inputType="number"
            />
            <FormField
              name="status"
              inputType="select-one"
              ref={statusRef}
              listItems={cargoRequestStatusList}
              listItemLabelField="name"
              label="Status"
              placeholder="Select Status"
              testID="cargoRequestStatusSelectInput"
              hidden="true"
            />
            <FormField
              name="createBy"
              inputType="select-one"
              ref={createByRef}
              listItems={appUserList}
              listItemLabelField="id"
              label="Create By"
              placeholder="Select Create By"
              testID="appUserSelectInput"
            />
            <FormField
              name="takenBy"
              inputType="select-one"
              ref={takenByRef}
              listItems={appUserList}
              listItemLabelField="id"
              label="Taken By"
              placeholder="Select Taken By"
              testID="appUserSelectInput"
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
              listItems={stateProvinceList}
              listItemLabelField="name"
              label="From State"
              placeholder="Select From State"
              testID="stateProvinceSelectInput"
            />
            <FormField
              name="toState"
              inputType="select-one"
              ref={toStateRef}
              listItems={stateProvinceList}
              listItemLabelField="name"
              label="To State"
              placeholder="Select To State"
              testID="stateProvinceSelectInput"
            />
            <FormField
              name="fromCity"
              inputType="select-one"
              ref={fromCityRef}
              listItems={cityList}
              listItemLabelField="name"
              label="From City"
              placeholder="Select From City"
              testID="citySelectInput"
            />
            <FormField
              name="toCity"
              inputType="select-one"
              ref={toCityRef}
              listItems={cityList}
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
    status: value.status && value.status.id ? value.status.id : null,
    createBy: value.createBy && value.createBy.id ? value.createBy.id : null,
    takenBy: value.takenBy && value.takenBy.id ? value.takenBy.id : null,
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
    createDate: value.createDate ?? null,
    agreedPrice: value.agreedPrice ?? null,
  };
  entity.status = value.status ? { id: value.status } : 1;
  entity.createBy = value.createBy ? { id: value.createBy } : null;
  entity.takenBy = value.takenBy ? { id: value.takenBy } : null;
  entity.fromCountry = value.fromCountry ? { id: value.fromCountry } : null;
  entity.toCountry = value.toCountry ? { id: value.toCountry } : null;
  entity.fromState = value.fromState ? { id: value.fromState } : null;
  entity.toState = value.toState ? { id: value.toState } : null;
  entity.fromCity = value.fromCity ? { id: value.fromCity } : null;
  entity.toCity = value.toCity ? { id: value.toCity } : null;
  entity.reqItemTypes = value.reqItemTypes.map((id) => ({ id }));
  return entity;
};

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
