// @flow

import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
  indicatorContainer: {
    flex: 1,
  },
  indicator: {
    backgroundColor: colors.tinyBlue,
    marginTop: 'auto',
    height: 2,
  },
  tabBar: {
    shadowColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.darkBlue,
    backgroundColor: null,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: null,
    elevation: 0,
  },
  tabBarTab: {
    borderWidth: 0,
    width: 70,
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeAreaViewContainer: {
    backgroundColor: colors.gradientBg[0],
  },
});
