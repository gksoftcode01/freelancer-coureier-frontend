import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AppUserActions from './app-user.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import CountryActions from '../country/country.reducer';
import StateProvinceActions from '../state-province/state-province.reducer';
import CityActions from '../city/city.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './app-user-styles';

const GenderType = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Femal',
    value: 'Femal',
  },
  {
    label: 'Other',
    value: 'Other',
  },
];

function AppUserEditScreen(props) {
  const {
    getAppUser,
    updateAppUser,
    route,
    appUser,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
    getAllCountries,
    countryList,
    getAllStateProvinces,
    stateProvinceList,
    getAllCities,
    cityList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getAppUser(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getAppUser, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(appUser));
    }
  }, [appUser, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
    getAllCountries();
    getAllStateProvinces();
    getAllCities();
  }, [getAllUsers, getAllCountries, getAllStateProvinces, getAllCities]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('AppUserDetail', { entityId: appUser?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateAppUser(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
 
  const formRef = createRef();
  const birthDateRef = createRef();
  const genderRef = createRef();
  const registerDateRef = createRef();
  const phoneNumberRef = createRef();
  const mobileNumberRef = createRef();
  const userRef = createRef();
  const countryRef = createRef();
  const stateProvinceRef = createRef();
  const cityRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="appUserEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="birthDate"
              ref={birthDateRef}
              label="Birth Date"
              placeholder="Enter Birth Date"
              testID="birthDateInput"
              inputType="datetime"
            />
            <FormField
              name="gender"
              ref={genderRef}
              label="Gender"
              placeholder="Enter Gender"
              testID="genderInput"
              inputType="select-one"
              listItems={GenderType}
              onSubmitEditing={() => registerDateRef.current?.focus()}
            />
            <FormField
              name="registerDate"
              ref={registerDateRef}
              label="Register Date"
              placeholder="Enter Register Date"
              testID="registerDateInput"
              inputType="datetime"
              onSubmitEditing={() => phoneNumberRef.current?.focus()}
            />
            <FormField
              name="phoneNumber"
              ref={phoneNumberRef}
              label="Phone Number"
              placeholder="Enter Phone Number"
              testID="phoneNumberInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => mobileNumberRef.current?.focus()}
            />
            <FormField
              name="mobileNumber"
              ref={mobileNumberRef}
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              testID="mobileNumberInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="id"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
            />
            <FormField
              name="country"
              inputType="select-one"
              ref={countryRef}
              listItems={countryList}
              listItemLabelField="name"
              label="Country"
              placeholder="Select Country"
              testID="countrySelectInput"
            />
            <FormField
              name="stateProvince"
              inputType="select-one"
              ref={stateProvinceRef}
              listItems={stateProvinceList}
              listItemLabelField="name"
              label="State Province"
              placeholder="Select State Province"
              testID="stateProvinceSelectInput"
            />
            <FormField
              name="city"
              inputType="select-one"
              ref={cityRef}
              listItems={cityList}
              listItemLabelField="name"
              label="City"
              placeholder="Select City"
              testID="citySelectInput"
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
    birthDate: value.birthDate ?? null,
    gender: value.gender ?? null,
    registerDate: value.registerDate ?? null,
    phoneNumber: value.phoneNumber ?? null,
    mobileNumber: value.mobileNumber ?? null,
    user: value.user && value.user.id ? value.user.id : null,
    country: value.country && value.country.id ? value.country.id : null,
    stateProvince: value.stateProvince && value.stateProvince.id ? value.stateProvince.id : null,
    city: value.city && value.city.id ? value.city.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    birthDate: value.birthDate ?? null,
    gender: value.gender ?? null,
    registerDate: value.registerDate ?? null,
    phoneNumber: value.phoneNumber ?? null,
    mobileNumber: value.mobileNumber ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  entity.country = value.country ? { id: value.country } : null;
  entity.stateProvince = value.stateProvince ? { id: value.stateProvince } : null;
  entity.city = value.city ? { id: value.city } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    countryList: state.countries.countryList ?? [],
    stateProvinceList: state.stateProvinces.stateProvinceList ?? [],
    cityList: state.cities.cityList ?? [],
    appUser: state.appUsers.appUser,
    fetching: state.appUsers.fetchingOne,
    updating: state.appUsers.updating,
    updateSuccess: state.appUsers.updateSuccess,
    errorUpdating: state.appUsers.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    getAllStateProvinces: (options) => dispatch(StateProvinceActions.stateProvinceAllRequest(options)),
    getAllCities: (options) => dispatch(CityActions.cityAllRequest(options)),
    getAppUser: (id) => dispatch(AppUserActions.appUserRequest(id)),
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
    updateAppUser: (appUser) => dispatch(AppUserActions.appUserUpdateRequest(appUser)),
    reset: () => dispatch(AppUserActions.appUserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppUserEditScreen);
