// @flow

import { StyleSheet, Dimensions } from 'react-native';
import colors from 'styles/colors';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: colors.tinyBlue,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContent: {
    flex: 0,
  },
  logo: {
    alignSelf: 'center',
    maxWidth: windowWidth * 0.6,
    height: 80,
    resizeMode: 'contain',
  },
  tagLine: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 30,
    backgroundColor: 'transparent',
    width: windowWidth * 0.8,
    color: colors.darkBlue,
  },
  buttonsContainer: {
    marginBottom: 20,
  },
  loader: {
    height: 20,
    marginBottom: 20,
  },
});
