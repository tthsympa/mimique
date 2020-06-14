// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { interestsFetch } from 'actions/interests';
import type { Interest, InterestsSection, InterestsState } from 'reduxTypes/interests';
import InterestSectionList from 'containers/interests/InterestSectionList';
import Container from 'components/common/layout/Container';
import { vars, colors } from 'styles';
import forEach from 'lodash/forEach';
import concat from 'lodash/concat';
import find from 'lodash/find';
import styles from './styles';
import MinIntersetsIndicator from './MinIntersetsIndicator';

type Props = {
  interests: InterestsState,
  dInterestsFetch: typeof interestsFetch,
  onValidityChange?: Function,
  welcome?: boolean,
};

class Interests extends React.Component<Props> {
  static defaultProps = {
    welcome: false,
    onValidityChange: null,
  }

  minUserInterestNbr = 3;

  descriptionText: string = 'Choisis tes centres d\'intérêts favoris ! Mimique te suggérera les évènements les plus pertinents selon ton profil';

  componentWillMount() {
    this.props.dInterestsFetch();
  }

  componentDidUpdate(prevProps) {
    const { interests, onValidityChange } = this.props;
    const currentInterestsNbr = interests.userInterests.length;
    if (onValidityChange && prevProps.interests.userInterests.length !== currentInterestsNbr) {
      onValidityChange(currentInterestsNbr >= this.minUserInterestNbr);
    }
  }

  get interests(): InterestsSection[] {
    const { welcome } = this.props;
    const { all, interests, userInterests } = this.props.interests;
    const itrs = [];
    forEach(interests, (interestIdx: [], catIdx: number) => {
      const itr = {
        name: all[catIdx].name,
        id: all[catIdx].id,
        data: concat([], interestIdx.map((interest, index) => {
          if (index <= 1) {
            return Object.assign({}, interest, {
              isInUserInterest: this.identifyUserInterests(userInterests, interest.id),
            });
          }
          return null;
        })),
      };
      itr.data = itr.data.filter(v => v);
      itrs.push(itr);
    });
    if (!welcome) {
      itrs.unshift({
        name: 'Mes intérêts',
        id: 0,
        data: concat([], userInterests.map(interest => (
          Object.assign({}, interest, {
            isInUserInterest: true,
          })
        ))),
      });
    }
    return itrs;
  }

  identifyUserInterests = (userInterests: Interest[], interestId: number): boolean => (
    find(userInterests, ['id', interestId]) !== undefined
  );

  render() {
    const { interests, welcome } = this.props;
    if (interests.isLoading) {
      return (
        <Container center>
          <ActivityIndicator color={colors.white} size="large" />
        </Container>
      );
    }
    if (interests.all.length === 0) {
      return (
        <Container center>
          <Text style={vars.typo.titleCentered}>{'Pas d\'interêts...'}</Text>
        </Container>
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {
            welcome
            && (
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{this.descriptionText}</Text>
            </View>
            )
          }
          <InterestSectionList interests={this.interests} />
          <MinIntersetsIndicator
            interests={interests}
            minUserInterestNbr={this.minUserInterestNbr}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ interests }) => ({
  interests,
});

const mapDispatchToProps = {
  dInterestsFetch: interestsFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
