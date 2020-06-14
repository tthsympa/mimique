// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  container: {
    paddingLeft: vars.padding,
    paddingVertical: vars.mdPadding,
    margin: 0,
    backgroundColor: colors.blue,
  },
  title: {
    ...vars.typo.h1,
    marginBottom: 0,
  },
});
