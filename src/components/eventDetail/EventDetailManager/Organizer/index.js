// @flow

import React from 'react';
import { View, Image, Text } from 'react-native';
import imgOrganizer from 'assets/images/organizer.png';

import styles from './styles';

type Props = {
  data: any,
  modal: boolean,
};

const Organizer = (props: Props): Node => {
  const organizer = props.data;
  const { modal } = props;
  return (
    <View style={styles.organizer} key={organizer.id}>
      <View style={styles.block}>
        <View style={styles.blockImg}>
          {
            organizer.imageUrl &&
              <Image source={{ uri: organizer.imageUrl }} style={styles.imgOrganizer} />
          }
          {
            !organizer.imageUrl &&
              <Image source={imgOrganizer} style={styles.imgOrganizer} />
          }
        </View>
        {
          modal &&
          <View style={styles.name}>
            <Text style={styles.first}>{organizer.firstName}</Text>
            <Text>{organizer.lastName}</Text>
          </View>
        }
      </View>
    </View>
  );
};

export default Organizer;
