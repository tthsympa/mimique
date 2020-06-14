// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  description: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: vars.lgPadding,
  },
  headerText: {
    ...vars.typo.title,
    textAlign: 'center',
  },
  descriptionText: {
    ...vars.typo.clear,
    textAlign: 'center',
    width: 300,
  },
  searching: {
    fontSize: 50,
  },
});
