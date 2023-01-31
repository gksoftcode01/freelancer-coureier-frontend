// import React, { useState,useEffect } from "react";
// import { SafeAreaView, StyleSheet, Button, Text } from "react-native";

//  import OTPInputView from "@twotalltotems/react-native-otp-input";
// import LoginActions from './login.reducer';
// import { connect } from 'react-redux';
// import { useDidUpdateEffect } from '../../shared/util/use-did-update-effect';

// const Otp = (props) => {
    
//  const { phoneNumber } = props.route.params;
//  const [invalidCode, setInvalidCode] = useState(false);
//  const { account, navigation, fetching, loginError,loginOtp   } = props;
//  const [error, setError] = useState('');
//    // if the user is already logged in, send them home
//    useEffect(() => {
//     if (account !== null) {
//       navigation.navigate('Home');
//     }
//   }, [account, navigation]);

//   // skip the first render but check for API responses and show error if not fetching
//   useDidUpdateEffect(() => {
//     if (!fetching && loginError) {
//       setError(loginError);
//      setInvalidCode(true);
//      }
//   }, [fetching]);

//   // submit handler
  


//  return (
//    <SafeAreaView style={styles.wrapper}>
//      <Text style={styles.prompt}>Enter the code we sent you</Text>
//      <Text style={styles.message}>
//        {`Your phone (${phoneNumber}) will be used to protect your account each time you log in.`}
//      </Text>
//      <Button
//        title="Edit Phone Number"
//        onPress={() => navigation.replace("PhoneNumber")}
//      />
//      <OTPInputView
//        style={{ width: "80%", height: 200 }}
//        pinCount={4}
//        autoFocusOnLoad
//        codeInputFieldStyle={styles.underlineStyleBase}
//        codeInputHighlightStyle={styles.underlineStyleHighLighted}
//        onCodeFilled={(code) => {
//         const options = {
//             phoneNumber : phoneNumber ,
//             otp : code
//         }
//         setError('');

//         loginOtp(options) ;
//        }}
//      />
//      {invalidCode && <Text style={styles.error}>Incorrect code.</Text>}
//    </SafeAreaView>
//  );
// };

// const mapStateToProps = (state) => {
//     return {
//       account: state.account.account,
//       fetching: state.login.fetching,
//       loginError: state.login.error,
//     };
//   };
  
//   const mapDispatchToProps = (dispatch) => {
//     return {
//         loginOtp: (options) => dispatch(LoginActions.loginOtp(options)),
//     };
//   };
  
//   export default connect(mapStateToProps, mapDispatchToProps)(Otp);

// const styles = StyleSheet.create({
//  wrapper: {
//    flex: 1,
//    justifyContent: "center",
//    alignItems: "center",
//  },

//  borderStyleBase: {
//    width: 30,
//    height: 45,
//  },

//  borderStyleHighLighted: {
//    borderColor: "#03DAC6",
//  },

//  underlineStyleBase: {
//    width: 30,
//    height: 45,
//    borderWidth: 0,
//    borderBottomWidth: 1,
//    color: "black",
//    fontSize: 20,
//  },

//  underlineStyleHighLighted: {
//    borderColor: "#03DAC6",
//  },

//  prompt: {
//    fontSize: 24,
//    paddingHorizontal: 30,
//    paddingBottom: 20,
//  },

//  message: {
//    fontSize: 16,
//    paddingHorizontal: 30,
//  },

//  error: {
//    color: "red",
//  },
// });

