// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
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
  imgElem: {
    flex: 1,
    paddingLeft: vars.smPadding,
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
    fontSize: 15,
    fontWeight: '500',
  },
  switchElem: {
    flex: 1,
    paddingRight: vars.smPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 35,
    height: 35,
  },
});
