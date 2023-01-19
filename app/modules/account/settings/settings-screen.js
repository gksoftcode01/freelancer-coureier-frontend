import React, { createRef } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import AccountActions from '../../../shared/reducers/account.reducer';
import styles from './settings-screen.styles';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';

function SettingsScreen(props) {

  const GenderType = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Femal',
      value: 'Femal',
    } 
  ];


  const {
   
    getAllCountries,
    countryList,
    getAllStateProvinces,
    stateProvinceList,
    getAllCities,
    cityList,
  } = props;
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
  });

  const onSubmit = (data) => {
    setSuccess('');
    setError('');
    props.updateAccount(formValueToEntity(data));
  };
  React.useEffect(() => {
     getAllCountries();
   // getAllStateProvinces();
  //  getAllCities();
  //, getAllStateProvinces, getAllCities
  }, [  getAllCountries]);
  useDidUpdateEffect(() => {
    if (!props.updating) {
      if (props.error) {
        setError(props.error);
      } else {
        props.getAccount();
        setSuccess('Settings updated');
      }
    }
  }, [props.updating]);

  // create refs for handling onSubmit functionality
  const formRef = createRef();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const birthDateRef = createRef();
  const genderRef = createRef();
  const registerDateRef = createRef();
  const phoneNumberRef = createRef();
  const mobileNumberRef = createRef();
   const countryRef = createRef();
  const stateProvinceRef = createRef();
  const cityRef = createRef();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      testID="settingsScreen"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      <Form initialValues={props.account} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
        <FormField
          name="firstName"
          ref={firstNameRef}
          testID="firstNameInput"
          label="First Name"
          placeholder="Enter first name"
          onSubmitEditing={() => lastNameRef?.current?.focus()}
          autoCapitalize="none"
        />
        <FormField
          name="lastName"
          ref={lastNameRef}
          testID="lastNameInput"
          label="Last Name"
          placeholder="Enter last name"
          onSubmitEditing={() => emailRef?.current?.focus()}
          autoCapitalize="none"
        />
        <FormField
          name="email"
          ref={emailRef}
          testID="emailInput"
          label="Email"
          placeholder="Enter email"
          onSubmitEditing={() => formRef?.current?.submitForm()}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="username"
        />
         {/* <FormField
              name="birthDate"
              ref={birthDateRef}
              label="Birth Date"
              placeholder="Enter Birth Date"
              testID="birthDateInput"
              inputType="datetime"
            /> */}
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

        <FormButton testID="settingsSubmitButton" title={'Save'} />
      </Form>
    </KeyboardAwareScrollView>
  );
}
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
    firstName : value.firstName ??null,
    lastName : value.lastName ??null,
    email: value.email??null,
    birthDate: value.birthDate ?? null,
    gender: value.gender ?? null,
    registerDate: value.registerDate ?? null,
    phoneNumber: value.phoneNumber ?? null,
    mobileNumber: value.mobileNumber ?? null,
  };
   entity.country = value.country ? { id: value.country } : null;
  entity.stateProvince = value.stateProvince ? { id: value.stateProvince } : null;
  entity.city = value.city ? { id: value.city } : null;
  return entity;
};
const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (account) => dispatch(AccountActions.accountUpdateRequest(account)),
    getAccount: () => dispatch(AccountActions.accountRequest()),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
    getAllStateProvinces: (options) => dispatch(StateProvinceActions.stateProvinceAllRequest(options)),
    getAllCities: (options) => dispatch(CityActions.cityAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
