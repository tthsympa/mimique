// @flow

import { StyleSheet } from 'react-native';
import { colors, vars } from 'styles';

export default StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: vars.padding,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  month: {
    color: colors.fadedRed,
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: vars.xsPadding,
  },
  day: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: vars.xsPadding,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  hour: {
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeSeparator: {
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 15,
  },
  minute: {
    color: colors.gray,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
