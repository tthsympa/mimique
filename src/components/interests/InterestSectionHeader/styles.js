// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: vars.padding,
    paddingVertical: vars.mdPadding,
    margin: 0,
    backgroundColor: colors.blue,
  },
  elem: {
    flexDirection: 'row',
  },
  titleElem: {
    flex: 7,
    alignItems: 'flex-start',
  },
  title: {
    ...vars.typo.h1,
    color: colors.lightBlue,
    marginBottom: 0,
  },
  iconElem: {
    flex: 3,
    alignItems: 'flex-end',
  },
});
