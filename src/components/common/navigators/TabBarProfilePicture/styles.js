// @flow

import { StyleSheet } from 'react-native';

const iconSize = 22;

export default StyleSheet.create({
  profilePicture: {
    height: iconSize,
    width: iconSize,
    resizeMode: 'cover',
    borderRadius: iconSize / 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
