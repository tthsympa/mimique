// @flow

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { Node } from 'react';
import sytles from './sytles';

type Props = {
  onPress: Function,
};

const EventListFooterPast = ({ onPress }: Props): Node => (
  <View style={sytles.container}>
    <TouchableOpacity onPress={onPress}>
      <Text style={sytles.text}>
        Voir les évènement passés
      </Text>
    </TouchableOpacity>
  </View>
);

EventListFooterPast.defaultProps = {

};

export default EventListFooterPast;
