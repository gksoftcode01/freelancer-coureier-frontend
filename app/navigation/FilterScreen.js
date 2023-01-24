import * as React from 'react';
import { Button, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
/* eslint-disable react-native/no-inline-styles */

export function FilterScreen({ props}) {
    const { navigation  } = props;

  React.useEffect(() => {
    if (!navigation.canGoBack()) {
      navigation.navigate('Drawer');
    }
  }, [navigation]);

  const dimensions = useWindowDimensions();
  return (
    <View style={styles.outerContainer}>
      <View style={[styles.backgroundContainer  ]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.flex}>
            <Text style={styles.titleFont}>
           filter
            </Text>
           </View>
          <View>
            <Button onPress={() => navigation.goBack()} title="DISMISS" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleFont: {
    fontSize: 30,
    textAlign: 'center',
  },
  messageFont: {
    fontSize: 25,
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  backgroundContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  errorIcon: {
    color: 'red',
  },
  successIcon: {
    color: 'green',
  },
});
