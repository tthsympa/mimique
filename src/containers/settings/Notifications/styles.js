// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

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
  item: {
    borderBottomColor: colors.gray,
  },
  elem: {
    padding: vars.smPadding,
    paddingTop: vars.lgPadding,
    paddingBottom: vars.lgPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textElem: {
    flex: 8,
    paddingLeft: vars.lgPadding,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  accountText: {
    fontSize: 13,
    fontWeight: '500',
  },
  switchElem: {
    flex: 1,
    paddingRight: vars.smPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
