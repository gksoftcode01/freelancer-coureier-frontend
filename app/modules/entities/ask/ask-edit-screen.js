import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AskActions from './ask.reducer';
import AppUserActions from '../app-user/app-user.reducer';
import CargoRequestActions from '../cargo-request/cargo-request.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './ask-styles';

const BidAskStatus = [
  {
    label: 'Approve',
    value: 'Approve',
  },
  {
    label: 'Reject',
    value: 'Reject',
  },
];

function AskEditScreen(props) {
  const {
    getAsk,
    updateAsk,
    route,
    ask,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllAppUsers,
    appUserList,
    getAllCargoRequests,
    cargoRequestList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getAsk(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getAsk, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(ask));
    }
  }, [ask, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllAppUsers();
    getAllCargoRequests();
  }, [getAllAppUsers, getAllCargoRequests]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('AskDetail', { entityId: ask?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateAsk(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const notesRef = createRef();
  const priceRef = createRef();
  const statusRef = createRef();
  const toUserRef = createRef();
  const cargoRequestRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="askEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="notes"
              ref={notesRef}
              label="Notes"
              placeholder="Enter Notes"
              testID="notesInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => priceRef.current?.focus()}
            />
            <FormField name="price" ref={priceRef} label="Price" placeholder="Enter Price" testID="priceInput" inputType="number" />
            <FormField
              name="status"
              ref={statusRef}
              label="Status"
              placeholder="Enter Status"
              testID="statusInput"
              inputType="select-one"
              listItems={BidAskStatus}
            />
            <FormField
              name="toUser"
              inputType="select-one"
              ref={toUserRef}
              listItems={appUserList}
              listItemLabelField="id"
              label="To User"
              placeholder="Select To User"
              testID="appUserSelectInput"
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
    notes: value.notes ?? null,
    price: value.price ?? null,
    status: value.status ?? null,
    toUser: value.toUser && value.toUser.id ? value.toUser.id : null,
    cargoRequest: value.cargoRequest && value.cargoRequest.id ? value.cargoRequest.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    notes: value.notes ?? null,
    price: value.price ?? null,
    status: value.status ?? null,
  };
  entity.toUser = value.toUser ? { id: value.toUser } : null;
  entity.cargoRequest = value.cargoRequest ? { id: value.cargoRequest } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    appUserList: state.appUsers.appUserList ?? [],
    cargoRequestList: state.cargoRequests.cargoRequestList ?? [],
    ask: state.asks.ask,
    fetching: state.asks.fetchingOne,
    updating: state.asks.updating,
    updateSuccess: state.asks.updateSuccess,
    errorUpdating: state.asks.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    getAsk: (id) => dispatch(AskActions.askRequest(id)),
    getAllAsks: (options) => dispatch(AskActions.askAllRequest(options)),
    updateAsk: (ask) => dispatch(AskActions.askUpdateRequest(ask)),
    reset: () => dispatch(AskActions.askReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AskEditScreen);
