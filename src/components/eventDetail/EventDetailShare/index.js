// @flow

import React from 'react';
import {
  View, Text, Share, TouchableOpacity, Alert,
} from 'react-native';
import type { Event } from 'reduxTypes/events';
import { createEventDeepLink } from 'services/DeepLink';
import styles from './styles';

type Props = {
  event: Event,
};

type State = {
};

export default class EventDetailShare extends React.Component<Props, State> {
  share = async () => {
    try {
      const { event } = this.props;
      const url = await createEventDeepLink(event);
      Share.share({
        message: `Mimique m'a proposé cet évènement: ${event.title} ! Ça t'intéresse de venir avec moi ?`,
        url,
        title: (event.title: string),
      }, {
        dialogTitle: 'Je partage !',
      });
    } catch (err) {
      Alert.alert('Oups, il y a un problème', err);
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Hop, on partage ça!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.share()}
        >
          <Text style={styles.text}>Partager cet évènement</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
