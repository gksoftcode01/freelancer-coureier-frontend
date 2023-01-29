import React, { createRef, useState } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

import AccountActions from '../../../shared/reducers/account.reducer';
import styles from './settings-screen.styles';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import CountryActions from '../../entities/country/country.reducer';
import StateProvinceActions from '../../entities/state-province/state-province.reducer';
import CityActions from '../../entities/city/city.reducer';

import { firebaseConfig } from '../../../config/firebaseConfig';
import { getApps, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Button, Image, Share, StatusBar, StyleSheet, Text, View, LogBox, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import Spinner from 'react-native-loading-spinner-overlay';

import uuid from 'uuid';
import {
  Container,
  Card,
  UserInfo,
  UserImgDetail,
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
  ControlIcons,
} from '../../../shared/themes/FeedStyles';
import { Constants } from 'expo';

import { Platform } from 'react-native';
 
function SettingsScreen(props) {

  const { getAllCountries, countryList, getAllStateProvinces, stateProvinceList, getAllCities, cityList, account, getAccount, navigation } =
  props;


  // Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
  if (!getApps().length) {
    const app = initializeApp(firebaseConfig);
  }

  // Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
  LogBox.ignoreLogs([`Setting a timer for a long period`]);

  const [image, setimage] = useState(account?.imageUrl);
  const [uploading, setuploading] = useState(false);
  React.useEffect(() => {
    async function checkPermission() {
      // You can await here
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      // ...
    }
    checkPermission();
  }, []); // Or [] if effect doesn't need props or state

  const GenderType = [
    {
      label: 'Male',
      value: 'Male',
    },
    {
      label: 'Femal',
      value: 'Femal',
    },
  ];


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // React.useEffect(() => {
  //   getAccount();
  // }, [getAccount]);

  // set up validation schema for the form
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
  });
  const [formValue, setFormValue] = useState();

  const onSubmit = (data) => {
    setSuccess('');
    setError('');
    const newData = {
      ...account,
      ...formValueToEntity(data),
    };

    props.updateAccount(newData);
   };
  React.useEffect(() => {
    getAllCountries();
  }, [getAllCountries, account]);

  // React.useEffect(() => {
  //   if (image) {
  //     account.imageUrl == image;
  //     props.updateAccount(account);
  //   }
  // }, [image]);

  useDidUpdateEffect(() => {
    if (props.updating === false) {
      if (props.errorUpdating) {
        setError(props.errorUpdating && props.errorUpdating.detail ? props.errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (props.updateSuccess) {
        setError('');
        setSuccess('Settings updated');
        navigation.replace('Home');
      }
    }
  }, [props.updateSuccess, props.errorUpdating, navigation]);

   

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
  }, [account]);

  const entityToFormValue = (value) => {
    if (!value) {
      return {};
    }
    return {
      id: value.id ?? null,
      firstName: value.firstName ?? null,
      lastName: value.lastName ?? null,
      email: value.email ?? null,

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
      firstName: value.firstName ?? null,
      lastName: value.lastName ?? null,
      email: value.email ?? null,
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

  const _share = () => {
    Share.share({
      message: image,
      title: 'Check out this photo',
      url: image,
    });
  };

  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    handleImagePicked(pickerResult);
  };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log({ pickerResult });

    handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setuploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setimage(uploadUrl);
        console.log(uploadUrl);
        //account.imageUrl == uploadUrl;
        const newData = {
          ...account,
          imageUrl:uploadUrl,
        };
       props.updateAccount(newData);
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      setuploading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      testID="settingsScreen"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      {!!success && <Text style={styles.successText}>{success}</Text>}
      <Spinner visible={uploading || props.updating}  textStyle={{ color: '#FFF' }} />
      <View style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center' }}>
        <UserImgDetail source={image?image: require('../../../../assets/avatar3.jpg')} />
      </View>

      <View style={styles.userBtnWrapper}>
        <TouchableOpacity style={styles.blueBtn} onPress={pickImage}>
          <Text style={styles.blueBtnTxt}> Choose image </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.blueBtn} onPress={() => takePhoto}>
          <Text style={styles.blueBtnTxt}> Take a photo </Text>
        </TouchableOpacity>
      </View>

      <StatusBar barStyle="default" />

      <View>
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
          </Form>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}
const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    updating: state.account.updating,
    error: state.account.error,
    updateSuccess: state.account.updateSuccess,
    countryList: state.countries.countryList ?? [],
    errorUpdating: state.account.errorUpdating,

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

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  const storage = getStorage();

  const fileRef = ref(storage, uuid.v4());
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  try {
    blob.close();
  } catch (error) {}
  return await getDownloadURL(fileRef);
}
