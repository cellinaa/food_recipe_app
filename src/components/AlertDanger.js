import React from 'react';
import { Text } from 'react-native';
import { styles } from '../constants';

const AlertDanger = ({ errorMsg }) => {
  return <Text style={styles.errorNotif}>{errorMsg}</Text>;
};

export default AlertDanger;
