// @flow

import React from 'react';
import { View } from 'react-native';
import type { Node } from 'react';
import styles from './styles';

const EventItemSeparator = (): Node => (
  <View style={styles.container} />
);

EventItemSeparator.defaultProps = {

};

export default EventItemSeparator;
