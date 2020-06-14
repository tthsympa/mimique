// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

export default StyleSheet.create({
  boxButton: {
    alignSelf: 'center',
    paddingHorizontal: vars.mdPadding,
    paddingVertical: vars.smPadding,
    borderRadius: 20,
    margin: vars.smMargin,
  },
  textButton: {
    fontSize: 13,
    color: colors.white,
    textAlign: 'center',
    flex: -1,
  },
});
