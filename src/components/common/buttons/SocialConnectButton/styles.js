// @flow

import { StyleSheet } from 'react-native';
import vars from 'styles/vars';

export default StyleSheet.create({
  container: {
    flex: 0,
    alignSelf: 'stretch',
    padding: 15,
    borderRadius: vars.borderRadius,
    marginBottom: 10,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
