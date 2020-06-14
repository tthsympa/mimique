// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: vars.lgPadding,
  },
  descriptionText: {
    ...vars.typo.clear,
    textAlign: 'center',
    width: 300,
  },
  capsule: {
    ...vars.container.capsule,
    ...vars.shadow.capsule,
  },
});
