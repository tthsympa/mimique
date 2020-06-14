// @flow

import { StyleSheet, Dimensions } from 'react-native';
import { colors, vars } from 'styles';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  scrollContainer: {
    width: width - (vars.padding * 2),
    borderRadius: vars.borderRadius,
    backgroundColor: colors.white,
  },
  container: {
    padding: vars.padding,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
