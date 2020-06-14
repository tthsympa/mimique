// @flow

import { StyleSheet } from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.blue,
  },
  button: {
    flex: 1,
    backgroundColor: colors.blue,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
});
