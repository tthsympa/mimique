// @flow

import { StyleSheet } from 'react-native';
import { vars } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: vars.mdPadding,
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setting: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTitle: {
    ...vars.typo.title,
    paddingRight: vars.lgPadding,
  },
});
