// @flow

import { StyleSheet, Dimensions } from 'react-native';
import colors from 'styles/colors';

const { width: viewportWidth } = Dimensions.get('window');

export const sliderWidth = viewportWidth;
export const itemWidth = viewportWidth;

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  slide: {
    width: Dimensions.get('window').width,
    height: 210,
  },
  img: {
    width: Dimensions.get('window').width,
    resizeMode: 'stretch',
    height: 210,
  },
  pagination: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 5,
  },
  paginationContentContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  paginationDotContainer: {
    marginHorizontal: 2,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 0,
    backgroundColor: colors.blue,
  },
  paginationInactiveDot: {
    backgroundColor: colors.blue,
  },
});
