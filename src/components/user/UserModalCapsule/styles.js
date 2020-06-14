// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  container: {
    ...vars.container.capsule,
    ...vars.shadow.capsule,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: vars.mdPadding,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.gray,
  },
  categoryTitle: {
    ...vars.typo.faded,
  },
});
