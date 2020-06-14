// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  filterContainer: {
    height: 60,
    flex: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    ...vars.typo.title,
    margin: vars.margin,
  },
});
