// @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { Node } from 'react';
import { withNavigation } from 'react-navigation';
import styles from './styles';

type Props = {
  navigation: Object,
  style: any,
};

const UserBodyModal = ({ navigation, style }: Props): Node => {
  const container = StyleSheet.flatten([
    styles.container,
    style,
  ]);
  const { params } = navigation.state;
  const Body = params.config.node;
  return (
    <View style={container}>
      <Body />
    </View>
  );
};

export default withNavigation(UserBodyModal);
