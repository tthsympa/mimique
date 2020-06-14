// @flow

import { StyleSheet } from 'react-native';
import { colors, vars } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vars.lgPadding,
  },
  button: {
    paddingTop: 2,
  },
  add: {
    color: colors.green,
  },
  delete: {
    color: colors.red,
  },
});
