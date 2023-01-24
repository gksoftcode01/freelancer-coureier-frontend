import { StyleSheet } from 'react-native';

import { ApplicationStyles } from './themes/application.styles';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  ...ApplicationStyles.entity,
  ...ApplicationStyles.entityDeleteModal,
});
