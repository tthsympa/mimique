// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    paddingBottom: vars.padding,
  },
  blockFriend: {
    flexDirection: 'row',
  },
  friend: {
    flexDirection: 'row',
  },
  titleManager: {
    ...vars.typo.h1,
  },
});
