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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: vars.margin,
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
  actionEvent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
