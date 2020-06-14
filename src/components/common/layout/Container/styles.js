// @flow

import { StyleSheet } from 'react-native';
import { colors, vars } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: vars.padding,
    backgroundColor: colors.blue,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
