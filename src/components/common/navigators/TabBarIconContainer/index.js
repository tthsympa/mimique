// @flow

import React from 'react';
import type { Node } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';

type Props = {
  name: string,
  tintColor: string,
  focused?: boolean
};

const TabBarIconContainer = ({ name, tintColor, focused }: Props): Node => (
  <Ionicons
    name={ioniconsByPlatform(name, focused)}
    size={26}
    style={{ color: tintColor }}
  />
);

TabBarIconContainer.defaultProps = {
  focused: false,
};

export default TabBarIconContainer;
