// @flow

import { StyleSheet } from 'react-native';
import { vars, colors } from 'styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vars.smBorderRadius,
    backgroundColor: colors.gray,
    marginRight: vars.smMargin,
    paddingVertical: 1,
    paddingHorizontal: vars.smPadding,
    overflow: 'hidden',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
