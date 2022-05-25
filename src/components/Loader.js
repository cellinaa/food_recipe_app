import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { COLORS, styles } from '../constants';
const Loader = ({ visible = false, addStyle }) => {
  const { width, height } = useWindowDimensions();
  return visible ? (
    <View style={[styles.container, { height, width }, { ...addStyle }]}>
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.darkGreen} />
        <Text style={{ marginLeft: 10, fontSize: 16 }}>Loading...</Text>
      </View>
    </View>
  ) : null;
};

export default Loader;
