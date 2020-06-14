// @flow

import React from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
import styles from './styles';

type Props = {
  children?: Node,
};

const SignInContainer = ({ children }: Props): Node => (
  <View style={styles.container}>
    {children}
  </View>
);

SignInContainer.defaultProps = {
  children: null,
};

export default SignInContainer;
