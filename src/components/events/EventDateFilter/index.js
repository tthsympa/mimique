// @flow

import React from 'react';
import type { Node } from 'react';
import DatePicker from 'react-native-datepicker';
import EventFilterBase from '../EventFilterBase';
import styles from './styles';

type Props = {
  iconName: string,
  onChange: Function,
  value: string,
  onClear: Function,
};

const EventDateFilter = (props: Props): Node => {
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
        <DatePicker
          mode="date"
          date={value}
          placeholder="Selectionner"
          format="DD-MM-YYYY"
          confirmBtnText="Confirmer"
          cancelBtnText="Annuler"
          onDateChange={onChange}
          customStyles={{
            dateInput: styles.dateInput,
            dateText: styles.dateText,
          }}
          showIcon={false}
          is24Hour
        />
      }
    />
  );
};

EventDateFilter.defaultProps = {

};

export default EventDateFilter;
