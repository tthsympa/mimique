// @flow

import React from 'react';
import { ScrollView, View } from 'react-native';
import type { Node } from 'react';
import styles from './styles';

type Props = {
  children: Node,
};

const EventFilterContainer = ({ children }: Props): Node => (
  <ScrollView
    style={styles.scrollContainer}
    horizontal
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
  >
    <View style={styles.container}>
      {children}
    </View>
  </ScrollView>
);

EventFilterContainer.defaultProps = {

};

export default EventFilterContainer;
