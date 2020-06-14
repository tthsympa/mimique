// @flow

import React from 'react';
import { View } from 'react-native';
import type { Node } from 'react';
import ModalButton from 'components/user/buttons/ModalButton';
import styles from './styles';

type Props = {
  elems: Array<{value: string, body: any}>,
  currentIndex: number,
  toggle: Function,
};

const UserModalCapsule = ({ elems, toggle, currentIndex }: Props): Node => (
  <View style={styles.container}>
    {
    elems.map((elem, index) => (
      <ModalButton
        opened={currentIndex === index}
        text={elem.body}
        toggle={toggle(index)}
        key={elem.value}
        elem={elem.value}
        index={index}
        length={elems.length - 1}
      />
      ))
    }
  </View>
);

export default UserModalCapsule;
