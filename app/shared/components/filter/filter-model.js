import React, { createRef } from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 import CountryActions from '../../../modules/entities/country/country.reducer';

import styles from '../../../modules/entities/flight/flight-styles';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
function FilterModal(props) {
  const { visible, setVisible,  filterEntity,setFilterEntity,getAllCountries ,countryList} 
  = props;
  const [formValue, setFormValue] = React.useState();

 
 
  const onSubmit = (data) => {
    setFilterEntity(formValueToEntity(data));
    setVisible(false);
      
  };

  const formRef = createRef();

  const fromCountryRef = createRef();
  const toCountryRef = createRef();
 const isMineRef = createRef();
 const isAskSentRef = createRef();

 const formValueToEntity = (value) => {
   const entity = {
     fromCountry: value.fromCountry && value.fromCountry.id ? value.fromCountry.id : null,
     toCountry: value.toCountry && value.toCountry.id ? value.toCountry.id : null,
     isMine : value.isMine  ?? false,
     isAskSent : value.isAskSent ?? false,
   };
   
   console.log(entity);
   return entity;
 };


  const entityToFormValue = (value) => {
    if (!value) {
      return {};
    }
    return {
      isMine: value.isMine ?? false,
      isAskSent: value.isAskSent ?? false,
      fromCountry: value.fromCountry && value.fromCountry.id ? value.fromCountry.id : null,
      toCountry: value.toCountry && value.toCountry.id ? value.toCountry.id : null,
      
    };
  };
  React.useEffect(() => {
    setFormValue(entityToFormValue(filterEntity));
  }, [filterEntity]);
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAwareScrollView
         enableResetScrollToCoords={false}
         keyboardShouldPersistTaps="handled"
         keyboardDismissMode="on-drag"
         contentContainerStyle={styles.paddedScrollView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Form onSubmit={onSubmit} ref={formRef}>
              <FormField
              name="fromCountry"
              inputType="select-one"
              ref={fromCountryRef}
              listItems={countryList}
              listItemLabelField="name"
              label="From Country"
              placeholder="Select From Country"
              testID="countrySelectInput"
              required="true"
            />
            <FormField
              name="toCountry"
              inputType="select-one"
              ref={toCountryRef}
              listItems={countryList}
              listItemLabelField="name"
              label="To Country"
              placeholder="Select To Country"
              testID="countrySelectInput"
              required="true"
            />
               <FormField
              name="isMine"
              ref={isMineRef}
              label="Created by me"
                inputType="boolean"
            />
                <FormField
              name="isAskSent"
              ref={isAskSentRef}
              label="My asks"
                inputType="boolean"
            />
                <View style={[styles.flexRow]}>
                  <TouchableHighlight
                    style={[styles.openButton, styles.cancelButton]}
                    onPress={() => {
                      setVisible(false);
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableHighlight>
                        {' '}
                  <FormButton title={'Save'} style={{padding:5}} />
                </View>
              </Form>
            </View>
          </View>
        </KeyboardAwareScrollView>
    </Modal>
  );
}



const mapStateToProps = (state) => {
  return {
     countryList: state.countries.countryList ?? [],
      fetching: state.cargoRequests.fetchingOne,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      getAllCountries: (options) => dispatch(CountryActions.countryAllRequest(options)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);


 