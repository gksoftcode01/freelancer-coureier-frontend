import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CargoRequestDetailsActions from './cargo-request-details.reducer';
import CargoRequestActions from '../cargo-request/cargo-request.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './cargo-request-details-styles';

function CargoRequestDetailsEditScreen(props) {
  const {
    getCargoRequestDetails,
    updateCargoRequestDetails,
    route,
    cargoRequestDetails,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllCargoRequests,
    cargoRequestList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCargoRequestDetails(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCargoRequestDetails, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(cargoRequestDetails));
    }
  }, [cargoRequestDetails, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllCargoRequests();
  }, [getAllCargoRequests]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('CargoRequestDetailsDetail', { entityId: cargoRequestDetails?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCargoRequestDetails(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const itemDescRef = createRef();
  const itemWeightRef = createRef();
  const itemHeightRef = createRef();
  const itemWidthRef = createRef();
  const itemPhotoRef = createRef();
  const itemPhotoContentTypeRef = createRef();
  const cargoRequestRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="cargoRequestDetailsEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="itemDesc"
              ref={itemDescRef}
              label="Item Desc"
              placeholder="Enter Item Desc"
              testID="itemDescInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => itemWeightRef.current?.focus()}
            />
            <FormField
              name="itemWeight"
              ref={itemWeightRef}
              label="Item Weight"
              placeholder="Enter Item Weight"
              testID="itemWeightInput"
              inputType="number"
              onSubmitEditing={() => itemHeightRef.current?.focus()}
            />
            <FormField
              name="itemHeight"
              ref={itemHeightRef}
              label="Item Height"
              placeholder="Enter Item Height"
              testID="itemHeightInput"
              inputType="number"
              onSubmitEditing={() => itemWidthRef.current?.focus()}
            />
            <FormField
              name="itemWidth"
              ref={itemWidthRef}
              label="Item Width"
              placeholder="Enter Item Width"
              testID="itemWidthInput"
              inputType="number"
              onSubmitEditing={() => itemPhotoRef.current?.focus()}
            />
            <FormField
              name="itemPhoto"
              ref={itemPhotoRef}
              label="Item Photo"
              placeholder="Enter Item Photo"
              testID="itemPhotoInput"
              onSubmitEditing={() => itemPhotoContentTypeRef.current?.focus()}
            />
            <FormField
              name="itemPhotoContentType"
              ref={itemPhotoContentTypeRef}
              label="Item Photo Content Type"
              placeholder="Enter Item Photo Content Type"
              testID="itemPhotoContentTypeInput"
              inputType="text"
              autoCapitalize="none"
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
    itemDesc: value.itemDesc ?? null,
    itemWeight: value.itemWeight ?? null,
    itemHeight: value.itemHeight ?? null,
    itemWidth: value.itemWidth ?? null,
    itemPhoto: value.itemPhoto ?? null,
    itemPhotoContentType: value.itemPhotoContentType ?? null,
    cargoRequest: value.cargoRequest && value.cargoRequest.id ? value.cargoRequest.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    itemDesc: value.itemDesc ?? null,
    itemWeight: value.itemWeight ?? null,
    itemHeight: value.itemHeight ?? null,
    itemWidth: value.itemWidth ?? null,
    itemPhoto: value.itemPhoto ?? null,
    itemPhotoContentType: value.itemPhotoContentType ?? null,
  };
  entity.cargoRequest = value.cargoRequest ? { id: value.cargoRequest } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    cargoRequestList: state.cargoRequests.cargoRequestList ?? [],
    cargoRequestDetails: state.cargoRequestDetails.cargoRequestDetails,
    fetching: state.cargoRequestDetails.fetchingOne,
    updating: state.cargoRequestDetails.updating,
    updateSuccess: state.cargoRequestDetails.updateSuccess,
    errorUpdating: state.cargoRequestDetails.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCargoRequests: (options) => dispatch(CargoRequestActions.cargoRequestAllRequest(options)),
    getCargoRequestDetails: (id) => dispatch(CargoRequestDetailsActions.cargoRequestDetailsRequest(id)),
    getAllCargoRequestDetails: (options) => dispatch(CargoRequestDetailsActions.cargoRequestDetailsAllRequest(options)),
    updateCargoRequestDetails: (cargoRequestDetails) =>
      dispatch(CargoRequestDetailsActions.cargoRequestDetailsUpdateRequest(cargoRequestDetails)),
    reset: () => dispatch(CargoRequestDetailsActions.cargoRequestDetailsReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestDetailsEditScreen);
