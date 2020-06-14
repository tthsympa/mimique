// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  descriptionText: {
    ...vars.typo.clear,
  },
  elem: {
    flex: 1,
    padding: vars.smPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconElem: {
    flex: 1,
    alignItems: 'center',
  },
  textElem: {
    flex: 9,
    alignItems: 'center',
  },
});
