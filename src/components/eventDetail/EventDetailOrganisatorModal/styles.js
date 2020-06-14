// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

export default StyleSheet.create({
  root: {
    backgroundColor: colors.blue,
    flex: 1,
    alignItems: 'center',
  },
  block: {
    marginTop: vars.xlMargin,
    backgroundColor: colors.white,
    paddingVertical: vars.smPadding,
    paddingHorizontal: vars.lgPadding,
    borderRadius: 5,
  },
  buttonBack: {
    position: 'absolute',
    top: 45,
    left: 20,
  },
  boxTitle: {
    alignItems: 'center',
    marginTop: 38,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
