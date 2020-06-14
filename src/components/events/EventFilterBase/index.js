// @flow

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import type { Node } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';
import isEmpty from 'lodash/isEmpty';
import styles, { iconSize, clearIconSize } from './styles';

type Props = {
  iconName: string,
  inputComponent: Node,
  onClear: Function,
  value: string,
};

const EventFilterBase = (props: Props): Node => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Ionicons
        name={ioniconsByPlatform(props.iconName)}
        size={iconSize}
        style={styles.icon}
      />
    </View>
    <View style={styles.filterContainer}>
      {props.inputComponent}
    </View>
    {
      !isEmpty(props.value) &&
      <TouchableOpacity onPress={props.onClear}>
        <View style={styles.clearContainer}>
          <Ionicons
            name={ioniconsByPlatform('close-circle', true)}
            size={clearIconSize}
            style={styles.clearIcon}
          />
        </View>
      </TouchableOpacity>
    }
  </View>
);

EventFilterBase.defaultProps = {

};

export default EventFilterBase;
