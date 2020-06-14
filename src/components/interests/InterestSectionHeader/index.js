// @flow

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import type { Node } from 'react';
import { withNavigation } from 'react-navigation';
import InterestDetails from 'containers/interests/InterestDetails';
import { ioniconsByPlatform } from 'utils/ionicons';
import styles from './styles';

type Props = {
  section: {
    name: string,
    id: number
  },
  navigation: Object,
};

const InterestsSectionHeader = (props: Props): Node => {
  const { section, navigation } = props;
  const details = {
    name: section.name,
    id: section.id,
    node: InterestDetails,
  };
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => navigation.navigate('DetailsScreen', { config: details })}
      >
        <View style={styles.elem}>
          <View style={styles.titleElem}>
            <Text style={styles.title}>{section.name.toUpperCase()}</Text>
          </View>
          <View style={styles.iconElem}>
            <Ionicons
              name={ioniconsByPlatform('arrow-forward', false)}
              size={24}
              color="#FFFFFF"
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default withNavigation(InterestsSectionHeader);
