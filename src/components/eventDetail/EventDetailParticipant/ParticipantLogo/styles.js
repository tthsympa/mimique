// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

export default StyleSheet.create({
  root: {
    flex: -1,
    marginRight: vars.smMargin,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockImg: {
    width: 48,
    height: 48,
    padding: vars.smPadding,
  },
  imgUser: {
    flex: 1,
    borderRadius: 18,
    borderColor: colors.tinyWhite,
    borderWidth: 2,
    width: null,
    height: null,
    backgroundColor: colors.lightBlue,
  },
  nameOrganizer: {
    color: colors.gray,
    textAlign: 'center',
    fontSize: 10,
  },
  name: {
    flexDirection: 'row',
  },
  first: {
    fontWeight: 'bold',
    marginRight: vars.xsMargin,
  },
  last: {
    fontWeight: 'bold',
  },
});
