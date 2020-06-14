// @flow

import React from 'react';
import type { Node } from 'react';
import { View, StyleSheet } from 'react-native';
import styles from './styles';

type Props = {
  children?: Node,
  style?: any,
  center?: boolean,
};

const Container = ({ children, style, center }: Props): Node => {
  const finalStyle = StyleSheet.flatten([
    styles.container,
    style,
    center ? styles.center : {},
  ]);
  return (
    <View style={finalStyle}>
      {children}
    </View>
  );
};

Container.defaultProps = {
  children: null,
  style: {},
  center: false,
};

export default Container;
