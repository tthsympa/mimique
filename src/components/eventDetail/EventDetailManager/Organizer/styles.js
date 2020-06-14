// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

export default StyleSheet.create({
  organizer: {
    flex: -1,
    marginRight: vars.smMargin,
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blockImg: {
    width: 65,
    height: 65,
    padding: vars.smPadding,
  },
  imgOrganizer: {
    flex: 1,
    borderRadius: 28,
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
});
