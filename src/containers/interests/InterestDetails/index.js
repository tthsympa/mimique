// @flow

import Emoji from '@ardentlabs/react-native-emoji';
import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import type { Interest, InterestsState } from 'reduxTypes/interests';
import InterestItem from 'containers/interests/InterestItem';
import EventItemSeparator from 'components/events/EventItemSeparator';
import concat from 'lodash/concat';
import find from 'lodash/find';
import styles from './styles';

type Props = {
  navigation: Object,
  interests: InterestsState,
};

type State = {
  animationDone: boolean,
};

// eslint-disable-next-line react/prefer-stateless-function
class InterestDetails extends React.Component<Props, State> {
    state = {
      animationDone: false,
    };

    get interests() {
      const { id } = this.props.navigation.state.params.config;
      const { all, userInterests } = this.props.interests;
      if (id) {
        const interestsInCategory = find(all, ['id', id]);
        if (interestsInCategory) {
          return concat([], Object.assign({}, {
            id: interestsInCategory.id,
            name: interestsInCategory.name,
            data: concat([], interestsInCategory.interests.map(interest => (
              Object.assign({}, interest, {
                isInUserInterest: this.identifyUserInterests(userInterests, interest.id),
              })))),
          }));
        }
      } else {
        return concat([], Object.assign({}, {
          id: 0,
          name: 'Mes intérêts',
          data: concat([], userInterests.map(userInterest => (
            Object.assign({}, userInterest, {
              isInUserInterest: true,
            })))),
        }));
      }
      return [];
    }

  identifyUserInterests = (userInterests: Interest[], interestId: number): boolean => (
    find(userInterests, ['id', interestId]) !== undefined
  );

  emptyTextAppearance = (isDone: boolean) => {
    this.setState({ animationDone: isDone });
  };

  emptyText: string = 'Tu n\'as renseigné aucun intérêt pour le moment... Rajoutes-en pour que les évènements que nous te proposerons soient le plus pertinent possible !';
  render() {
    // eslint-disable-next-line prefer-destructuring
    const interests = this.interests;
    if (interests && !interests[0].data.length) {
      if (this.state.animationDone) {
        return (
          <View style={styles.emptyUserInterests}>
            <Text style={styles.emptyText}>
              {this.emptyText}
            </Text>
            <Text style={[{ fontSize: 20, paddingTop: 10 }]}><Emoji name="confused" /></Text>
          </View>
        );
      }
    }
    return (
      <SectionList
        renderItem={section => <InterestItem onPress={this.emptyTextAppearance} {...section} />}
        sections={interests}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={EventItemSeparator}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const mapStateToProps = ({ user, interests }) => ({
  userId: user.user.id,
  interests,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(InterestDetails));
