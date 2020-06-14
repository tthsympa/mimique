// @flow

import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Button from 'components/common/buttons/Button';

import styles from './styles';
import colors from '../../../styles/colors';

type Props = {
  data: any,
  addParticipation: Function,
  deleteParticipation: Function,
};

const EventDetailHeader = (props: Props): Node => {
  const event = props.data;
  const date = moment(event.beginDatetime);
  const day = date.format('DD');
  const month = date.format('MMM');
  const hour = date.format('HH');
  const minute = date.format('mm');

  return (
    <View style={styles.boxHeaderInfo}>
      <View style={styles.actionEvent}>
        {
          event.participates &&
            <Button type="error" text="Ne plus participer" onPress={() => props.deleteParticipation(event.id)} />
        }
        {
          !event.participates &&
            <Button type="neutral" textColor={colors.blue} text="Participer !" onPress={() => props.addParticipation(event.id, event)} />
        }
      </View>
      <View style={styles.boxDate}>
        <View style={styles.dayMonth}>
          <Text style={styles.day}>{day}</Text>
          <Text style={styles.month}>{month.toUpperCase()}</Text>
        </View>
        <View style={styles.hourMinute}>
          <Text style={styles.hour}>{hour}:</Text>
          <Text style={styles.minute}>{minute}</Text>
        </View>
      </View>
    </View>
  );
};

export default EventDetailHeader;
