import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import UserRateActions from './user-rate.reducer';
import CargoRequestActions from '../cargo-request/cargo-request.reducer';
import AppUserActions from '../app-user/app-user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './user-rate-styles';

function UserRateEditScreen(props) {
  const {
    getUserRate,
    updateUserRate,
    route,
    userRate,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllCargoRequests,
    cargoRequestList,
    getAllAppUsers,
    appUserList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getUserRate(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getUserRate, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(userRate));
    }
  }, [userRate, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllCargoRequests();
    getAllAppUsers();
  }, [getAllCargoRequests, getAllAppUsers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('UserRateDetail', { entityId: userRate?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateUserRate(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const rateRef = createRef();
  const noteRef = createRef();
  const rateDateRef = createRef();
  const cargoRequestRef = createRef();
  const appUserRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="userRateEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="rate"
              ref={rateRef}
              label="Rate"
              placeholder="Enter Rate"
              testID="rateInput"
              inputType="number"
              onSubmitEditing={() => noteRef.current?.focus()}
            />
            <FormField
              name="note"
              ref={noteRef}
              label="Note"
              placeholder="Enter Note"
              testID="noteInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => rateDateRef.current?.focus()}
            />
            <FormField
              name="rateDate"
              ref={rateDateRef}
              label="Rate Date"
              placeholder="Enter Rate Date"
              testID="rateDateInput"
              inputType="datetime"
            />
            <FormField
              name="cargoRequest"
              inputType="select-one"
              ref={cargoRequestRef}
              listItems={cargoRequestList}
              listItemLabelField="id"
              label="Cargo Request"
              placeholder="Select Cargo Request"
              testID="cargoRequestSelectInput"
            />
            <FormField
              name="appUser"
              inputType="select-one"
              ref={appUserRef}
              listItems={appUserList}
              listItemLabelField="id"
              label="App User"
              placeholder="Select App User"
              testID="appUserSelectInput"
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
    rate: value.rate ?? null,
    note: value.note ?? null,
    rateDate: value.rateDate ?? null,
    cargoRequest: value.cargoRequest && value.cargoRequest.id ? value.cargoRequest.id : null,
    appUser: value.appUser && value.appUser.id ? value.appUser.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    rate: value.rate ?? null,
    note: value.note ?? null,
    rateDate: value.rateDate ?? null,
  };
  entity.cargoRequest = value.cargoRequest ? { id: value.cargoRequest } : null;
  entity.appUser = value.appUser ? { id: value.appUser } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    cargoRequestList: state.cargoRequests.cargoRequestList ?? [],
    appUserList: state.appUsers.appUserList ?? [],
    userRate: state.userRates.userRate,
    fetching: state.userRates.fetchingOne,
    updating: state.userRates.updating,
    updateSuccess: state.userRates.updateSuccess,
    errorUpdating: state.userRates.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
    getUserRate: (id) => dispatch(UserRateActions.userRateRequest(id)),
    getAllUserRates: (options) => dispatch(UserRateActions.userRateAllRequest(options)),
    updateUserRate: (userRate) => dispatch(UserRateActions.userRateUpdateRequest(userRate)),
    reset: () => dispatch(UserRateActions.userRateReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRateEditScreen);
