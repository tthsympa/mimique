// @flow

import { StyleSheet } from 'react-native';
import { vars } from 'styles';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 80,
  },
  firstItem: {
    borderTopLeftRadius: vars.borderRadius,
    borderTopRightRadius: vars.borderRadius,
  },
  lastItem: {
    borderBottomLeftRadius: vars.borderRadius,
    borderBottomRightRadius: vars.borderRadius,
  },
  square: {
  },
  content: {
    flex: 1,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
