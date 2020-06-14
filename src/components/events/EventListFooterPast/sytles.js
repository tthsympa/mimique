// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: vars.mdPadding,
  },
  text: {
    textDecorationLine: 'underline',
    color: colors.white,
    fontWeight: '600',
  },
});
