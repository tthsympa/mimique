// @flow

import { StyleSheet } from 'react-native';
import { colors, vars } from 'styles';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  componentContainer: {
    flex: 1,
  },
  controlsContainer: {
    paddingTop: vars.padding,
    paddingHorizontal: vars.padding,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
