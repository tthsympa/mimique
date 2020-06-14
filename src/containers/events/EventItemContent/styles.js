// @flow

import { StyleSheet } from 'react-native';
import { vars } from 'styles';

export default StyleSheet.create({
  container: {
    padding: vars.smPadding,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  title: {
    ...vars.typo.h2,
    marginBottom: 0,
  },
  location: {
    ...vars.typo.smContent,
  },
  interests: {
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    paddingLeft: vars.smPadding,
  },
});
