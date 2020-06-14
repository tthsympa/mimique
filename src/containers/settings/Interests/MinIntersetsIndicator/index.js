// @flow

import React from 'react';
import { View, Text } from 'react-native';
import type { Node } from 'react';
import type { InterestsState } from 'reduxTypes/interests';
import styles from './styles';

type Props = {
  interests: InterestsState,
  minUserInterestNbr: number,
};

const MinIntersetsIndicator = ({ interests, minUserInterestNbr }: Props): Node => {
  const userInterestNbr = interests.userInterests.length;
  const restUserInterest = minUserInterestNbr - userInterestNbr;

  return (
    restUserInterest > 0 &&
    <View style={styles.container}>
      <Text style={styles.text}>
        Sélectionnez encore au moins{' '}
        <Text style={styles.interestNumber}>
          {restUserInterest}
        </Text>
        {' '}intérêt{restUserInterest === 1 ? '' : 's'}.
      </Text>
    </View>
  );
};

MinIntersetsIndicator.defaultProps = {

};

export default MinIntersetsIndicator;
