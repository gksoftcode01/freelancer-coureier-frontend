import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import BidActions from './bid.reducer';
import AppUserActions from '../app-user/app-user.reducer';
import CargoRequestActions from '../cargo-request/cargo-request.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './bid-styles';

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

function BidEditScreen(props) {
  const {
    getBid,
    updateBid,
    route,
    bid,
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
      getBid(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getBid, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(bid));
    }
  }, [bid, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('BidDetail', { entityId: bid?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateBid(formValueToEntity(data));

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
  const fromUserRef = createRef();
  const cargoRequestRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="bidEditScrollView"
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
              name="fromUser"
              inputType="select-one"
              ref={fromUserRef}
              listItems={appUserList}
              listItemLabelField="id"
              label="From User"
              placeholder="Select From User"
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
    fromUser: value.fromUser && value.fromUser.id ? value.fromUser.id : null,
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
  entity.fromUser = value.fromUser ? { id: value.fromUser } : null;
  entity.cargoRequest = value.cargoRequest ? { id: value.cargoRequest } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    appUserList: state.appUsers.appUserList ?? [],
    cargoRequestList: state.cargoRequests.cargoRequestList ?? [],
    bid: state.bids.bid,
    fetching: state.bids.fetchingOne,
    updating: state.bids.updating,
    updateSuccess: state.bids.updateSuccess,
    errorUpdating: state.bids.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAppUsers: (options) => dispatch(AppUserActions.appUserAllRequest(options)),
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    getBid: (id) => dispatch(BidActions.bidRequest(id)),
    getAllBids: (options) => dispatch(BidActions.bidAllRequest(options)),
    updateBid: (bid) => dispatch(BidActions.bidUpdateRequest(bid)),
    reset: () => dispatch(BidActions.bidReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BidEditScreen);
