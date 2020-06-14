// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  capsule: {
    ...vars.container.capsule,
    ...vars.shadow.capsule,
  },
  elem: {
    padding: vars.smPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconElem: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textElem: {
    flex: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.red,
  },
});
