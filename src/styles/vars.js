// @flow

import colors from './colors';

export default {

  // Border
  smBorderRadius: 4,
  borderRadius: 6,

  // Spacing
  xsPadding: 2,
  smPadding: 5,
  padding: 10,
  mdPadding: 15,
  lgPadding: 20,
  xlPadding: 50,
  xxlPadding: 80,

  xsMargin: 2,
  smMargin: 5,
  margin: 10,
  mdMargin: 15,
  lgMargin: 20,
  xlMargin: 50,
  xxlMargin: 80,

  // Typo
  typo: {
    h1: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.blue,
    },
    h2: {
      fontSize: 17,
      fontWeight: 'bold',
      marginBottom: 5,
      color: colors.blue,
    },
    smContent: {
      fontSize: 13,
      color: colors.blue,
    },
    shy: {
      fontSize: 14,
      color: colors.gray,
      fontWeight: '500',
    },
    faded: {
      fontSize: 17,
      color: colors.fadedBlue,
      fontWeight: '300',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    titleCentered: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      alignSelf: 'center',
    },
    clear: {
      fontSize: 14,
      fontWeight: '300',
      color: '#ffffff',
    },
  },

  // Container
  container: {
    capsule: {
      flex: 1,
      borderRadius: 6,
      backgroundColor: colors.tinyBlue,
      marginBottom: 20,
    },
  },

  shadow: {
    capsule: {
      shadowOpacity: 0.85,
      shadowColor: '#303030',
      shadowOffset: { width: 3, height: 3 },
    },
  },
};
