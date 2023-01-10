import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CargoRequestStatusActions from './cargo-request-status.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './cargo-request-status-styles';

function CargoRequestStatusEditScreen(props) {
  const {
    getCargoRequestStatus,
    updateCargoRequestStatus,
    route,
    cargoRequestStatus,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCargoRequestStatus(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCargoRequestStatus, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(cargoRequestStatus));
    }
  }, [cargoRequestStatus, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('CargoRequestStatusDetail', { entityId: cargoRequestStatus?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCargoRequestStatus(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="cargoRequestStatusEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
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
    name: value.name ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    cargoRequestStatus: state.cargoRequestStatuses.cargoRequestStatus,
    fetching: state.cargoRequestStatuses.fetchingOne,
    updating: state.cargoRequestStatuses.updating,
    updateSuccess: state.cargoRequestStatuses.updateSuccess,
    errorUpdating: state.cargoRequestStatuses.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCargoRequestStatus: (id) => dispatch(CargoRequestStatusActions.cargoRequestStatusRequest(id)),
    getAllCargoRequestStatuses: (options) => dispatch(CargoRequestStatusActions.cargoRequestStatusAllRequest(options)),
    updateCargoRequestStatus: (cargoRequestStatus) =>
      dispatch(CargoRequestStatusActions.cargoRequestStatusUpdateRequest(cargoRequestStatus)),
    reset: () => dispatch(CargoRequestStatusActions.cargoRequestStatusReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CargoRequestStatusEditScreen);
