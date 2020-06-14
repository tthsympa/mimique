// @flow

import React from 'react';
import type { Node } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';
import colors from 'styles/colors';

import Organizer from './Organizer';

import styles from './styles';

type Props = {
  navigation: Object,
  data: any,
};

const EventDetailManager = (props: Props): Node => {
  const event = props.data;
  const { navigation } = props;
  return (
    <View>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>{event.title}</Text>
      </View>
      {
        event.organizers.length > 0 &&
          <Text style={styles.titleManager}>{event.organizers.length <= 1 ? 'Organisé par' : 'Organisés par'}</Text>
      }
      <View style={styles.boxManager}>
        <View style={styles.blockManager}>
          {
            event.organizers.map(item => (
              <View key={item.id}>
                <Organizer data={item} modal={false} />
              </View>
            ))
          }
          {
            event.organizers.length > 0 &&
              <TouchableOpacity onPress={() => navigation.navigate('OrganizerModal', { organizer: event.organizers })} style={styles.moreOrganizer}>
                <Ionicons
                  name={ioniconsByPlatform('more', true)}
                  size={32}
                  color={colors.blue}
                />
              </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
};

export default EventDetailManager;
