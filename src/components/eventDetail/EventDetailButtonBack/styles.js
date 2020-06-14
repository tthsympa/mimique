// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

export default StyleSheet.create({
  boxHeaderInfo: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: vars.margin,
  },
  boxTitle: {
    flex: 3,
    paddingLeft: vars.padding,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 20,
  },
  boxDate: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: vars.smMargin,
  },
  dayMonth: {
    flexDirection: 'row',
  },
  day: {
    fontSize: 20,
    color: colors.white,
    paddingRight: vars.padding,
  },
  month: {
    fontSize: 20,
    color: colors.orange,
  },
  hourMinute: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: vars.smPadding,
  },
  hour: {
    fontSize: 20,
    color: colors.white,
    alignSelf: 'flex-end',
  },
  minute: {
    color: colors.white,
    fontSize: 12,
    alignSelf: 'flex-end',
    paddingBottom: vars.xsPadding,
  },
});
