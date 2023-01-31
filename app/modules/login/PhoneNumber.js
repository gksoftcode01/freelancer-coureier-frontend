// import React, { useState, useRef ,useEffect} from "react";
// import {
//  SafeAreaView,
//  StyleSheet,
//  View,
//  TouchableOpacity,
//  Text,
// } from "react-native";
// import { Colors } from "react-native/Libraries/NewAppScreen";
// import PhoneInput from "react-native-phone-number-input";
// import LoginActions from './login.reducer';
// import { connect } from 'react-redux';

// const PhoneNumber = (props) => {
//     const { account, navigation, fetching, loginError, attemptLogin,generateOtp  ,generateOtpSuccess } = props;

//  const [value, setValue] = useState("");
//  const [formattedValue, setFormattedValue] = useState("");
//  const phoneInput = useRef<PhoneInput>(null);

// useEffect(() => {
//    if(generateOtpSuccess){
//     navigation.navigate("Otp", { phoneNumber: formattedValue });
//    }
// }, [generateOtpSuccess]);
 


//  return (
//    <>
//      <View style={styles.container}>
//        <SafeAreaView style={styles.wrapper}>
//          <View style={styles.welcome}>
//            <Text>Welcome!</Text>
//          </View>
//          <PhoneInput
//            ref={phoneInput}
//            defaultValue={value}
//            defaultCode="AE"
//            layout="first"
//            onChangeText={(text) => {
//              setValue(text);
//            }}
//            onChangeFormattedText={(text) => {
//              setFormattedValue(text);
//            }}
//            countryPickerProps={{ withAlphaFilter: true }}
//            withShadow
//            autoFocus
//          />
//          <TouchableOpacity
//            style={styles.button}
//            onPress={() => {
//              // TODO - send SMS!
//              const options = {phoneNumber : formattedValue} ;
//              generateOtp(options);
//            }}
//          >
//            <Text style={styles.buttonText}>Sign Up</Text>
//          </TouchableOpacity>
//        </SafeAreaView>
//      </View>
//    </>
//  );
// };

// const mapStateToProps = (state) => {
//     return {
//       account: state.account.account,
//       fetching: state.login.fetching,
//       loginError: state.login.error,
//       generateOtpSuccess : state.login.generateOtpSuccess,
//     };
//   };
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         generateOtp : (options) => dispatch(LoginActions.generateOtp(options)),
//     };
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);

// const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: Colors.lighter,
//  },

//  wrapper: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//  },

//  button: {
//    marginTop: 20,
//    height: 50,
//    width: 300,
//    justifyContent: "center",
//    alignItems: "center",
//    backgroundColor: "#7CDB8A",
//    shadowColor: "rgba(0,0,0,0.4)",
//    shadowOffset: {
//      width: 1,
//      height: 5,
//    },
//    shadowOpacity: 0.34,
//    shadowRadius: 6.27,
//    elevation: 10,
//  },

//  buttonText: {
//    color: "white",
//    fontSize: 14,
//  },

//  welcome: {
//    padding: 20,
//  },

//  status: {
//    padding: 20,
//    marginBottom: 20,
//    justifyContent: "center",
//    alignItems: "flex-start",
//    color: "gray",
//  },
// });

 