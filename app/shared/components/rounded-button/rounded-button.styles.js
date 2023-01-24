import { StyleSheet } from 'react-native';

import { Fonts, Colors, Metrics } from '../../themes';

export default StyleSheet.create({
  button: {
    height: 35,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.myPurple,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    //fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin,
  },
});
