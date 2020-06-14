// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';
import colors from 'styles/colors';
import ParticipantLogo from './ParticipantLogo';

import styles from './styles';

type Props = {
  data: Object,
  navigation: Object,
};

const EventDetailFriend = (props: Props): Node => {
  const colorsTab = [{ backgroundColor: colors.honeydew },
    { backgroundColor: colors.skyBlue },
    { backgroundColor: colors.queenBlue },
    { backgroundColor: colors.spaceCadet },
    { backgroundColor: colors.lavenderPurple },
    { backgroundColor: colors.carnationPink },
    { backgroundColor: colors.classicRose }];

  const participants = props.data;
  return (
    <View>
      <Text style={styles.titleManager}>{participants.length <= 1 ? 'Participant' : 'Participants'}</Text>
      <View style={styles.root}>
        {
          participants.length > 0 &&
          <View style={styles.blockFriend}>
            <View style={styles.friend}>
              {
                participants.map((item, index) => (
                  <ParticipantLogo
                    key={item.id}
                    modal={false}
                    backgroundColor={colorsTab[index % 7]}
                  />
                ))
              }
            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('ParticipantModal', { participants })}>
              <Ionicons
                name={ioniconsByPlatform('more', true)}
                size={32}
                color={colors.blue}
              />
            </TouchableOpacity>
          </View>
        }
        {
          participants.length === 0 &&
            <View>
              <Text>Pas de participants à cet évènement</Text>
            </View>
        }
      </View>
    </View>
  );
};

export default EventDetailFriend;
