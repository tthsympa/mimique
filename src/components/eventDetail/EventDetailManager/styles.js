// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

export default StyleSheet.create({
  boxManager: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vars.margin,
  },
  blockManager: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: vars.padding,
    borderRightColor: colors.lightGray,
    borderRightWidth: 1,
  },
  moreOrganizer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionEvent: {
    flex: 1,
  },
  titleManager: {
    ...vars.typo.h1,
  },
  noOrga: {
    paddingRight: vars.smPadding,
  },
  boxTitle: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    color: colors.greenBlue,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: vars.smMargin,
  },
});
