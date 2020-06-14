// @flow

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import type { Node } from 'react';
import { ioniconsByPlatform } from 'utils/ionicons';
import colors from 'styles/colors';
import styles from './styles';

type Props = {
  logOutConnect: () => void,
};

const LogOutButton = ({ logOutConnect }: Props): Node => (
  <View style={styles.capsule}>
    <TouchableHighlight
      underlayColor={colors.fadedRed}
      onPress={() => logOutConnect()}
    >
      <View style={styles.elem}>
        <View style={styles.iconElem}>
          <Ionicons
            name={ioniconsByPlatform('log-out', false)}
            size={32}
            color={colors.red}
          />
        </View>
        <View style={styles.textElem}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </View>
      </View>
    </TouchableHighlight>
  </View>
);

export default LogOutButton;
