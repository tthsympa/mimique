// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  boxText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    paddingBottom: vars.smPadding,
  },
  title: {
    fontSize: 18,
    paddingBottom: vars.smPadding,
  },
  titleManager: {
    ...vars.typo.h1,
  },
});
