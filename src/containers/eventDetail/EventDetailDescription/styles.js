// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonBox: {
    flex: 1,
    alignItems: 'center',
  },
  iconMore: {
    flex: -1,
  },
  titleManager: {
    ...vars.typo.h1,
  },
});
