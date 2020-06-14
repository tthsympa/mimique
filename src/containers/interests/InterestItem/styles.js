// @flow

import { StyleSheet } from 'react-native';
import { vars } from 'styles';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 90,
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
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    ...vars.typo.shy,
    color: '#000000',
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
