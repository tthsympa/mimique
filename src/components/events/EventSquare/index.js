// @flow

import React from 'react';
import { View, Text } from 'react-native';
import type { Node } from 'react';
import moment from 'moment';
import capitalize from 'lodash/capitalize';
import styles from './styles';

type Props = {
  dateTime: Date,
};

const EventSquare = ({ dateTime }: Props): Node => {
  const date = moment(dateTime);
  const month = capitalize(date.format('MMM'));
  const day = date.format('D');
  const hour = date.format('HH');
  const minute = date.format('mm');

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.month}>{month}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.hour}>{hour}</Text>
        <Text style={styles.timeSeparator}>:</Text>
        <Text style={styles.minute}>{minute}</Text>
      </View>
    </View>
  );
};

EventSquare.defaultProps = {

};

export default EventSquare;
