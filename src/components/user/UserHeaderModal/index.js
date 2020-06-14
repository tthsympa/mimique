// @flow

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import type { Node } from 'react';
import { withNavigation } from 'react-navigation';
import { ioniconsByPlatform } from 'utils/ionicons';
import { colors } from 'styles';
import styles from './styles';

type Props = {
  navigation: Object,
  style: any,
  fromModal?: boolean
};

// Rajouter une props pour enlever le back button si en cours de Login - Voir avec Quentin
const UserHeaderModal = ({ navigation, fromModal, style }: Props): Node => {
  const container = StyleSheet.flatten([
    styles.container,
    style,
  ]);
  const { params } = navigation.state;
  const arrowIcon = fromModal ? 'arrow-back' : 'arrow-down';
  return (
    <View style={container}>
      <View style={styles.backButton}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.goBack(null)}
        >
          <Ionicons
            name={ioniconsByPlatform(arrowIcon, false)}
            size={32}
            color={colors.white}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingTitle}>{ params.config.name }</Text>
      </View>
    </View>
  );
};

UserHeaderModal.defaultProps = {
  fromModal: false,
};

export default withNavigation(UserHeaderModal);
