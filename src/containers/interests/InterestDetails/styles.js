// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  emptyUserInterests: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: vars.smPadding,
  },
  emptyText: {
    ...vars.typo.clear,
  },
});
