// @flow

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';

import colors from 'styles/colors';

import styles from './styles';

type Props = {
  onPress: Function,
  state: boolean
};

const EventDetailIoniButton = (props: Props): Node => {
  const iconType = props.state ? 'arrow-up' : 'arrow-down';
  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity
        style={styles.iconMore}
        onPress={() => props.onPress()}
        activeOpacity={0}
      >
        <Ionicons
          name={ioniconsByPlatform(iconType, true)}
          size={32}
          color={colors.blue}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EventDetailIoniButton;
