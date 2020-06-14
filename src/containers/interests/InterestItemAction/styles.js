// @flow

import { StyleSheet } from 'react-native';
import { colors, vars } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: vars.lgPadding,
  },
  button: {
    paddingTop: 2,
  },
  add: {
    color: colors.green,
  },
  remove: {
    color: colors.red,
  },
});
