import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SIZES, FONTS, COLORS, styles } from '../constants';

const CustomInput = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <>
      <TextInput
        style={styles.input}
        placeHolderTextColor={COLORS.gray}
        {...props}
      />
      {/* {error && <Text style={styles.errorMsg}>{error}</Text>} -> bikin error render */}
      <View>{error ? <Text style={styles.errorMsg}>{error}</Text> : null}</View>
    </>
  );
};

export default CustomInput;
