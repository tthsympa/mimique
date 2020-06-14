// @flow

import React from 'react';
import { View, Text } from 'react-native';
import type { Node } from 'react';
import { colors } from 'styles';
import styles from './styles';

type Props = {
  label: string,
  color?: string,
};

const Badge = ({ label, color }: Props): Node => (
  <View style={[styles.container, { backgroundColor: color }]}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

Badge.defaultProps = {
  color: colors.gray,
};

export default Badge;
