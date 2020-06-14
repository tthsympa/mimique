// @flow

import React from 'react';
import { ScrollView } from 'react-native';
import type { Node } from 'react';
import styles from './styles';

type Props = {
  children: Node,
};

const BadgeContainer = ({ children }: Props): Node => (
  <ScrollView
    style={styles.container}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    horizontal
  >
    {children}
  </ScrollView>
);

BadgeContainer.defaultProps = {

};

export default BadgeContainer;
