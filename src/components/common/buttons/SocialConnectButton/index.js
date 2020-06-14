// @flow

import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import type { Node } from 'react';
import _ from 'lodash';
import colors from 'styles/colors';
import { darken } from 'utils/color';
import styles from './styles';

type Props = {
  onPress: () => void,
  source: 'facebook' | 'google',
};

const SocialConnectButton = ({ onPress, source }: Props): Node => {
  const capSource = _.capitalize(source);
  const socialColor = (source === 'facebook')
    ? colors.facebook
    : colors.google;
  const socialDarkenColor = darken(socialColor, 0.2);
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.container, { backgroundColor: socialColor }]}
      underlayColor={socialDarkenColor}
    >
      <Text style={styles.text}>
        Connexion avec {capSource}
      </Text>
    </TouchableHighlight>
  );
};

export default SocialConnectButton;
