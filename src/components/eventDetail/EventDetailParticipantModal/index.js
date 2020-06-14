// @flow

import React from 'react';
import { View, Text } from 'react-native';
import colors from 'styles/colors';
import Container from 'components/common/layout/Container';
import EventDetailBackButton from 'components/eventDetail/EventDetailBackButton';

import ParticipantLogo from '../EventDetailParticipant/ParticipantLogo';
import styles from './styles';

type Props = {
  navigation: Object,
};

const EventDetailParticipantModal = (props: Props): Node => {
  const { navigation } = props;
  const { participants } = navigation.state.params;
  const text = "Participants de l'évènement";
  const colorsTab = [{ backgroundColor: colors.honeydew },
    { backgroundColor: colors.skyBlue },
    { backgroundColor: colors.queenBlue },
    { backgroundColor: colors.spaceCadet },
    { backgroundColor: colors.lavenderPurple },
    { backgroundColor: colors.carnationPink },
    { backgroundColor: colors.classicRose }];
  return (
    <Container style={styles.root}>
      <View style={styles.buttonBack}>
        <EventDetailBackButton navigation={navigation} />
      </View>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>{text}</Text>
      </View>
      <View style={styles.block}>
        <View>
          {
            participants &&
              participants.map((item, index) => (
                <View key={item.id}>
                  <ParticipantLogo
                    backgroundColor={colorsTab[index % 7]}
                    data={item}
                    modal
                  />
                </View>
              ))
          }
        </View>
      </View>
    </Container>
  );
};

export default EventDetailParticipantModal;
