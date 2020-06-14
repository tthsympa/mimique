// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: vars.smPadding,
  },
  descriptionText: {
    ...vars.typo.clear,
    fontWeight: '500',
    textAlign: 'justify',
    paddingBottom: vars.smPadding,
  },
  instructionText: {
    ...vars.typo.faded,
    fontSize: 14,
    paddingTop: vars.mdPadding,
  },
  scrollView: {
    flex: 8,
    position: 'relative',
  },
  iconScroll: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 155,
  },
  emoji: {
    position: 'absolute',
    top: 160,
    left: 10,
    right: 0,
    bottom: 0,
  },
});
