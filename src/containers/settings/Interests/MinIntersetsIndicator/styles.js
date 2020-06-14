// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: vars.padding,
  },
  text: {
    ...vars.typo.clear,
  },
  interestNumber: {
    fontWeight: 'bold',
  },
});
