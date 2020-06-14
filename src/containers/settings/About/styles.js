// @flow

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  header: {
    flex: 1,
  },
  body: {
    flex: 9,
  },
  boxScrollView: {
    flex: 1,
  },
  boxImage: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    flex: 1,
    paddingBottom: 100,
  },
  text: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 10,
  },
  logo: {
    alignSelf: 'center',
    maxWidth: windowWidth * 0.6,
    height: 80,
    resizeMode: 'contain',
    paddingTop: 200,
  },
  container: {
    flex: 1,
  },
});
