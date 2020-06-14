// @flow

import React from 'react';
import { View, Text } from 'react-native';
import type { Node } from 'react';
import styles from './styles';

type Props = {
  label?: ?string,
};

const EventEmptyPlaceholder = ({ label }: Props): Node => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {label}
    </Text>
  </View>
);

EventEmptyPlaceholder.defaultProps = {
  label: 'Pas d\'évènement...',
};

export default EventEmptyPlaceholder;
