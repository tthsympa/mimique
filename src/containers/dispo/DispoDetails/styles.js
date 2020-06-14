// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  dayView: {
    display: 'flex',
    flex: 5,
    flexDirection: 'column',
  },
  swipeText: {
    ...vars.typo.title,
  },
  pickerText: {
    ...vars.typo.title,
  },
  hours: {
    ...vars.typo.smContent,
  },
  dateText: {
    ...vars.typo.clear,
    fontSize: 17,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.white,
  },
  dateInput: {
    borderWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.white,
  },
  textElem: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountText: {
    ...vars.typo.title,
  },
  switchElem: {
    flex: 3,
    paddingRight: vars.smPadding,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
