import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { COLORS, styles } from '../constants';

const CustomInput = ({ error, ...props }) => {
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
