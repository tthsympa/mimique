// @flow

import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableHighlight } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import React from 'react';
import type { Node } from 'react';
import { ioniconsByPlatform } from 'utils/ionicons';
import colors from 'styles/colors';
import { componentStyle, markdownStyle } from './styles';

type Props = {
  elem: string,
  index: number,
  length: number,
  opened: boolean,
  toggle: Function,
  text: string,
};

// eslint-disable-next-line object-curly-newline
const ModalButton = ({ elem, index, length, opened, toggle, text }: Props): Node => {
  const icon = opened ? 'arrow-down' : 'arrow-forward';

  return (
    <View style={[componentStyle.item, index === length ? { borderBottomWidth: 0 }
                                                : { borderBottomWidth: 0.5 }]}
    >
      <TouchableHighlight underlayColor={colors.lightBlue} onPress={toggle}>
        <View style={componentStyle.elem}>
          <View style={componentStyle.iconElem}>
            <Ionicons
              name={ioniconsByPlatform(icon, false)}
              size={32}
            />
          </View>
          <View style={componentStyle.textElem}>
            <Text style={componentStyle.buttonText}>{elem}</Text>
          </View>
        </View>
      </TouchableHighlight>
      {
        opened &&
        <Markdown style={markdownStyle}>{text}</Markdown>
      }
    </View>
  );
};

export default ModalButton;
