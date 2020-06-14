// @flow

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';
import colors from 'styles/colors';
import styles from './styles';

type Props = {
  way: 'back' | 'forward',
  hidden?: boolean,
  onPress: Function,
};

const PaginationArrow = (props: Props): Node => (
  <View style={props.way === 'forward' ? styles.containerBack : styles.containerForward}>
    {
      !props.hidden &&
      <TouchableOpacity
        style={styles.iconMore}
        onPress={() => props.onPress()}
        activeOpacity={0}
      >
        <Ionicons
          name={ioniconsByPlatform(`arrow-${props.way}`, true)}
          size={32}
          color={colors.white}
        />
      </TouchableOpacity>
    }
  </View>
);

PaginationArrow.defaultProps = {
  hidden: false,
};

export default PaginationArrow;
