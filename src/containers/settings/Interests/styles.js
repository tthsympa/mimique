// @flow

import { StyleSheet } from 'react-native';
import { colors, vars } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: vars.lgPadding,
  },
  descriptionText: {
    ...vars.typo.clear,
    textAlign: 'center',
    width: 300,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.blue,
  },
});
