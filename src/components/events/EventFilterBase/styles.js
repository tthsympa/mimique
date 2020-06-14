// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export const iconSize = 25;
export const clearIconSize = 15;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginRight: vars.margin,
    borderRadius: vars.borderRadius,
    backgroundColor: colors.blue,
    overflow: 'hidden',
    width: 200,
  },
  iconContainer: {
    padding: vars.padding,
    borderRightWidth: 1,
    borderRightColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: iconSize,
    width: iconSize,
    overflow: 'hidden',
    color: colors.white,
    alignItems: 'center',
    textAlign: 'center',
  },
  filterContainer: {
    flex: 1,
  },
  clearContainer: {
    flex: 1,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIcon: {
    height: clearIconSize,
    width: clearIconSize - 3,
    overflow: 'hidden',
    color: colors.white,
    alignItems: 'center',
  },
});
