// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export const componentStyle = StyleSheet.create({
  item: {
    borderBottomColor: colors.gray,
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
  },
  text: {
    paddingLeft: 50,
  },
});

export const markdownStyle = StyleSheet.create({
  heading1: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 40,
  },
  heading2: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 40,
  },
  paragraph: {
    paddingHorizontal: vars.smPadding,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
