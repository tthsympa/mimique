// @flow

import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';

type Props = {
  navigation: Object,
};

const EventDetailBackButton = (props: Props): Node => (
  <View>
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => props.navigation.goBack(null)}
    >
      <Ionicons
        name={ioniconsByPlatform('arrow-down', false)}
        size={32}
        color="#FFFFFF"
      />
    </TouchableHighlight>
  </View>
);

export default EventDetailBackButton;
