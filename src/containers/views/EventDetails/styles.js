// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';
import colors from 'styles/colors';

export default StyleSheet.create({
  root: {
    padding: 0,
  },
  header: {
    flex: 1,
    backgroundColor: 'green',
  },
  body: {
    flex: 3,
    backgroundColor: colors.blue,
    paddingTop: vars.padding,
    padding: vars.mdPadding,
  },
  boxInfo: {
    flex: 6,
  },
  scrollView: {
    ...vars.container.capsule,
    ...vars.shadow.capsule,
    marginBottom: 0,
    margin: 0,
    padding: vars.padding,
  },
  titleManager: {
    ...vars.typo.h1,
  },
  buttonBack: {
    position: 'absolute',
    top: 35,
    left: 20,
  },
  caroussel: {
    flex: 1,
  },
});
