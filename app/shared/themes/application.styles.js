import Fonts from './fonts';
import Metrics from './metrics';
import Colors from './colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
  
    userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 5,
      borderRadius : '20%'
    },
    yellowdBtn: {
      borderColor: Colors.myLightOrange,
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
    },
    yellowdBtnTxt: {
      color:  Colors.myLightOrange,
    },
   blueBtn: {
      borderColor: Colors.myBlue,
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
    },
    blueBtnTxt: {
      color:   Colors.myBlue,
    },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: Colors.myGrey,
       },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.jhipsterBlue,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
    },
    subtitle: {
      color: Colors.myBlue,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text,
    },
    loading: {
      flex: 1,
      ...Fonts.style.h5,
      alignItems: 'center',
      textAlign: 'center',
    },
    button: {
      height: 36,
      backgroundColor: Colors.myPurple,
      borderColor: Colors.myPurple,
      borderWidth: 1,
      borderRadius: 8,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center',
    },
    orangebutton: {
      height: 36,
      backgroundColor: Colors.transparent,
      borderColor: Colors.myLightOrange,
      borderWidth: 1,
      borderRadius: 8,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    orangebuttonText: {
      fontSize: 18,
      color: Colors.myLightOrange,
      alignSelf: 'center',
    },
    purpbutton: {
      height: 36,
      backgroundColor: Colors.myLightPurple,
      borderColor: Colors.myLightPurple,
      borderWidth: 1,
      borderRadius: 8,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    purpbuttonText: {
      fontSize: 18,
      color: Colors.white,
      alignSelf: 'center',
    },
    errorText: {
      color: Colors.error,
      fontSize: 14,
    },
    successText: {
      color: 'green',
      fontSize: 14,
    },
    darkLabel: {
      fontWeight: 'bold',
      color: Colors.white,
    },
    label: {
      fontWeight: 'bold',
    },
    backgroundlabel: {
      fontSize: 14,
      color:Colors.black,
      backgroundColor: Colors.myGrey,
      padding : 5,
      margin : 5,
      borderRadius :10,
      fontWeight : 'bold',
     },
    flex: {
      flex: 1,
    },
    paddedScrollView: { paddingBottom: 30 },
  },
  entity: {
    listRow: {
      flex: 1,
      padding: 10,
      borderRadius: 7,
      backgroundColor: Colors.myPurple,
      marginVertical: Metrics.smallMargin,
      justifyContent: 'center',
    },
    smallBlackLabel: {
      color: Colors.black,
      fontSize: 12,
       color: '#666',
      
     },
    purpleLabel: {
      color: Colors.myPurple,
      fontWeight: 'bold',
    },
    pinkLabel: {
      color: Colors.myPink,
      fontWeight: 'bold',
    },
    orangeLabel: {
      color: Colors.myLightOrange,
      fontWeight: 'bold',
    },
    whiteLabel: {
      color: 'white',
      fontWeight: 'bold',
    },
    listContent: {
      marginTop: Metrics.baseMargin,
    },
    entityButtons: { marginBottom: 20 },
    imageBlob: {
      width: '50%',
      height: undefined,
      aspectRatio: 1,
      resizeMode: 'cover',
      borderWidth: 1,
      borderColor: 'lightgrey',
    },
  },
  entityDeleteModal: {
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 5,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 5,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      maxHeight: 300,
    },
    openButton: {
      backgroundColor: 'grey',
      borderRadius: 15,
      padding: 10,
      elevation: 2,
    },
    cancelButton: {
      backgroundColor: 'grey',
    },
    submitButton: {
      backgroundColor: 'red',
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
      zIndex: 200,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    flexRow: {
      flexDirection: 'row',
    },
  },
};

export default ApplicationStyles;
