// @flow

import { Ionicons } from '@expo/vector-icons';
import { StoreReview } from 'expo';
import React from 'react';
import {
  Text, View, TouchableHighlight,
} from 'react-native';
import type { Node } from 'react';
import { withNavigation } from 'react-navigation';
import { ioniconsByPlatform } from 'utils/ionicons';
import colors from 'styles/colors';
import styles from './styles';

type Props = {
  elem: {name: string, node: Node},
  index: number,
  length: number,
  navigation: Object,
};

const ionicons = {
  'Identité': 'person',
  'Notifications': 'notifications',
  'Personaliser mes intérêts': 'options',
  'Mes comptes': 'link',
  'Mes disponibilités': 'calendar',
  'Écrire une suggestion': 'bulb',
  'Noter Mimique': 'heart',
  'À propos': 'information',
  'Nous contacter': 'paper-plane',
};

// eslint-disable-next-line object-curly-newline
const SettingButton = ({ elem, index, length, navigation }: Props): Node => {
  // TODO: put real store review when app is public
  const navigate = () => (
    // eslint-disable-next-line no-nested-ternary
    elem.name === 'Noter Mimique'
      ? StoreReview.requestReview()
      // Alert.alert(
      //   'Noter Mimique',
      //   'La notation sera très bientôt disponible sur le Store. Merci de ton intérêt pour Mimique 🙏',
      // ))
      : navigation.navigate('UserModal', { config: elem })
  );

  return (
    <View style={[styles.item, index === length ? { borderBottomWidth: 0 }
      : { borderBottomWidth: 0.5 }]}
    >
      <TouchableHighlight
        underlayColor={colors.lightBlue}
        onPress={navigate}
      >
        <View style={styles.elem}>
          <View style={styles.iconElem}>
            <Ionicons
              name={ioniconsByPlatform(ionicons[elem.name], false)}
              size={32}
              color={elem.name === 'Noter Mimique' ? colors.red : colors.blue}
            />
          </View>
          <View style={styles.textElem}>
            <Text style={styles.buttonText}>{elem.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default withNavigation(SettingButton);
