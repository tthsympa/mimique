// @flow

import React from 'react';
import { View, Text } from 'react-native';
import Container from 'components/common/layout/Container';
import EventDetailBackButton from 'components/eventDetail/EventDetailBackButton';

import Organizer from '../EventDetailManager/Organizer';
import styles from './styles';

type Props = {
  navigation: Object,
};

const EventDetailOrganisatorModal = (props: Props): Node => {
  const { navigation } = props;
  const { organizer } = navigation.state.params;
  const text = "Organisateur de l'évènement";
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
            organizer.map(item => (
              <View key={item.id}>
                <Organizer data={item} modal />
              </View>
            ))
          }
        </View>
      </View>
    </Container>
  );
};

export default EventDetailOrganisatorModal;
