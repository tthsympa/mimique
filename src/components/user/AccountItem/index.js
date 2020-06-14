// @flow

import React from 'react';
import { Text, View, Image, Switch } from 'react-native';
import type { Node } from 'react';
import colors from 'styles/colors';
import styles from './styles';

type Props = {
  provider: Object,
  index: number,
  length: number,
  onlyOneAccount: boolean,
  onChange: Function
};

// eslint-disable-next-line object-curly-newline
const AccountItem = ({ provider, index, onlyOneAccount, length, onChange }: Props): Node => (
  <View style={[styles.item, index === (length - 1)
    ? { borderBottomWidth: 0 }
    : { borderBottomWidth: 0.5 }]}
  >
    <View style={styles.elem}>
      <View style={styles.imgElem}>
        <Image
          style={styles.image}
          source={provider.logo}
        />
      </View>
      <View style={styles.textElem}>
        <Text style={styles.accountText}>Lier son compte {provider.type}</Text>
      </View>
      <View style={styles.switchElem}>
        <Switch
          style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
          onValueChange={() => onChange(
            provider.isLoggedWith,
            provider.type.toLowerCase(),
            provider.id,
          )}
          onTintColor={colors.greenBlue}
          tintColor={colors.fadedBlue}
          value={provider.isLoggedWith}
          disabled={onlyOneAccount && provider.isLoggedWith}
        />
      </View>
    </View>
  </View>
);

export default AccountItem;
