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
import CountryActions from '../../entities/country/country.reducer'
import StateProvinceActions from '../../entities/state-province/state-province.reducer'
import CityActions from '../../entities/city/city.reducer'


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
    account,
    getAccount,
    navigation
  } = props;
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  // React.useEffect(() => {
  //   getAccount();
  // }, [getAccount]);

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
  });
  const [formValue, setFormValue] = React.useState();

  const onSubmit = (data) => {
    setSuccess('');
    setError('');
    const newData = {
      ...account,
      ...formValueToEntity(data)
  };
  
    props.updateAccount(newData);
  };
  React.useEffect(() => {
     getAllCountries();
 
  }, [  getAllCountries,account]);

  useDidUpdateEffect(() => {
    if (!props.updating) {
      if (props.error) {
                setError(props.error);

      } else if (props.updateSuccess) {
        setError('');
        props.getAccount();
        setSuccess('Settings updated');
    navigation.replace('Home' ) ;
      }
    }
  }, [props.updateSuccess, props.updating, navigation]);

  

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
 
  React.useEffect(() => {
  
      setFormValue(entityToFormValue(account));
  
  }, [account ]);

  
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    firstName : value.firstName ??null,
    lastName : value.lastName??null,  
    email : value.email??null,

    birthDate: value.birthDate ?? null,
    gender: value.gender ?? null,
    registerDate: value.registerDate ?? null,
    phoneNumber: value.phoneNumber ?? null,
    mobileNumber: value.mobileNumber ?? null,
     country: value.country && value.country.id ? value.country.id : null,
   };
};
const formValueToEntity = (value) => {
  console.log(account);
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
 
  entity.login = account.login;

  return entity;
};

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      testID="settingsScreen"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      {formValue && (
         <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
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
         <FormField
              name="birthDate"
              ref={birthDateRef}
              label="Birth Date"
              placeholder="Enter Birth Date"
              testID="birthDateInput"
              inputType="date"
            />   
            <FormField
              name="gender"
              ref={genderRef}
              label="Gender"
              placeholder="Enter Gender"
              testID="genderInput"
              inputType="select-one"
              listItems={GenderType}
              onSubmitEditing={() => mobileNumberRef.current?.focus()}
            />
         
            <FormField
              name="mobileNumber"
              ref={mobileNumberRef}
              label="Mobile Number"
              placeholder="+971xxxxxxxxx"
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
              label="Nationality"
              placeholder="Select Country"
              testID="countrySelectInput"
            />
        
        <FormButton testID="settingsSubmitButton" title={'Save'} />
      </Form>)}
    </KeyboardAwareScrollView>
  );
}
const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error,
    countryList: state.countries.countryList ?? [],

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (account) => dispatch(AccountActions.accountUpdateRequest(account)),
    getAccount: () => dispatch(AccountActions.accountRequest()),
    getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)), 
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
