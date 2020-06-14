// @flow

import React from 'react';
import { View, Image, Text } from 'react-native';
import icon from 'assets/images/tmpOrganizer.png';

import styles from './styles';

type Props = {
  backgroundColor: Object,
  data: Object,
  modal: boolean,
};

const ParticipantLogo = (props: Props): Node => {
  const { modal } = props;
  const participant = props.data;
  return (
    <View style={styles.root}>
      <View style={styles.block}>
        <View style={styles.blockImg}>
          <Image source={icon} style={[styles.imgUser, props.backgroundColor]} />
        </View>
        {
          modal &&
            <View style={styles.name}>
              <Text style={styles.first}>{participant.firstName}</Text>
              <Text style={styles.last}>{participant.lastName}</Text>
            </View>
        }
      </View>
    </View>
  );
};

export default ParticipantLogo;
