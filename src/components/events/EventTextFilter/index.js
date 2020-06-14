// @flow

import React from 'react';
import { TextInput } from 'react-native';
import type { Node } from 'react';
import { colors } from 'styles';
import EventFilterBase from '../EventFilterBase';
import styles from './styles';

type Props = {
  iconName: string,
  onChange: Function,
  value: string,
  onClear: Function,
};

const EventTextFilter = (props: Props): Node => {
  const {
    onChange,
    value,
    onClear,
    ...rest
  } = props;
  return (
    <EventFilterBase
      {...rest}
      value={value}
      onClear={onClear}
      inputComponent={
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChange}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          selectionColor={colors.gray}
        />
      }
    />
  );
};

EventTextFilter.defaultProps = {

};

export default EventTextFilter;
