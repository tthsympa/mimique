// @flow

import React from 'react';
import { Text, View } from 'react-native';
import type { Node } from 'react';
import { colors } from 'styles';
import styles from './styles';

type Props = {
  title: string,
  isIdeal: boolean,
};

const EventSectionHeader = (props: Props): Node => (
  <View style={styles.container}>
    <Text
      style={[styles.title, { color: props.isIdeal ? colors.gold : colors.lightBlue }]}
    >
      {props.title.toUpperCase()}
    </Text>
  </View>
);

EventSectionHeader.defaultProps = {

};

export default EventSectionHeader;
