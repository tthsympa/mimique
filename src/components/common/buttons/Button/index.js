// @flow

import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import type { Node } from 'react';
import colors from 'styles/colors';
import styles from './styles';

type Props = {
  onPress: Function,
  type: 'primary' | 'secondary' | 'warning' | 'error' | 'success' | 'neutral',
  text: string,
  textColor?: string,
  disabled?: boolean,
};

const manageColor = (type) => {
  switch (type) {
    case 'primary':
      return colors.blue;
    case 'secondary':
      return colors.gray;
    case 'warning':
      return colors.orange;
    case 'error':
      return colors.red;
    case 'success':
      return colors.green;
    case 'neutral':
      return colors.white;
    default:
      return colors.blue;
  }
};

// eslint-disable-next-line object-curly-newline
const Button = ({ onPress, type, text, textColor, disabled }: Props): Node => (
  <TouchableHighlight
    style={[styles.boxButton, { backgroundColor: manageColor(type) }]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.textButton, { color: textColor }]}>{text}</Text>
  </TouchableHighlight>
);

Button.defaultProps = {
  textColor: '#FFFFFF',
  disabled: false,
};

export default Button;
