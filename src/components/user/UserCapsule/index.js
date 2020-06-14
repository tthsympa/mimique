// @flow

import React from 'react';
import { Text, View } from 'react-native';
import type { Node } from 'react';
import SettingButton from 'components/user/buttons/SettingButton';
import styles from './styles';

type Props = {
  category: string,
  elems: Array<{name: string, node: Node}>,
};

const UserCapsule = ({ category, elems }: Props): Node => (
  <View style={styles.capsule}>
    <View style={styles.category}>
      <Text style={styles.categoryTitle}>{category}</Text>
    </View>
    {
      elems.map((elem, index) => (
        <SettingButton
          key={elem.name}
          elem={elem}
          index={index}
          length={elems.length - 1}
        />
      ))
    }
  </View>
);

export default UserCapsule;
