// @flow

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import type { Node } from 'react';
import { ioniconsByPlatform } from 'utils/ionicons';
import styles from './styles';

type Props = {
  skippableText: string
};

const AccountSkippableButton = ({ skippableText }: Props): Node => (
  <TouchableHighlight
    underlayColor="transparent"
  >
    <View style={styles.elem}>
      <View style={styles.textElem}>
        <Text style={styles.descriptionText}>{skippableText}</Text>
      </View>
      <View style={styles.iconElem}>
        <Ionicons
          name={ioniconsByPlatform('arrow-forward', false)}
          size={16}
          color="#FFFFFF"
        />
      </View>
    </View>
  </TouchableHighlight>
);

export default AccountSkippableButton;
