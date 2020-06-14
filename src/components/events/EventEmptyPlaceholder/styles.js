// @flow

import { StyleSheet } from 'react-native';
import { vars } from 'styles';

export default StyleSheet.create({
  container: {
    marginTop: '30%',
    alignItems: 'center',
  },
  text: {
    ...vars.typo.title,
  },
});
