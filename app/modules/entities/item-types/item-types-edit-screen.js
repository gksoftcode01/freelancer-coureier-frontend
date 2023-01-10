import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ItemTypesActions from './item-types.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './item-types-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
});

function ItemTypesEditScreen(props) {
  const { getItemTypes, updateItemTypes, route, itemTypes, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getItemTypes(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getItemTypes, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(itemTypes));
    }
  }, [itemTypes, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ItemTypesDetail', { entityId: itemTypes?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateItemTypes(formValueToEntity(data));

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
        testID="itemTypesEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
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
    itemTypes: state.itemTypes.itemTypes,
    fetching: state.itemTypes.fetchingOne,
    updating: state.itemTypes.updating,
    updateSuccess: state.itemTypes.updateSuccess,
    errorUpdating: state.itemTypes.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItemTypes: (id) => dispatch(ItemTypesActions.itemTypesRequest(id)),
    getAllItemTypes: (options) => dispatch(ItemTypesActions.itemTypesAllRequest(options)),
    updateItemTypes: (itemTypes) => dispatch(ItemTypesActions.itemTypesUpdateRequest(itemTypes)),
    reset: () => dispatch(ItemTypesActions.itemTypesReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTypesEditScreen);
