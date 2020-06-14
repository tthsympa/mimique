// @flow

import React from 'react';
import { TabNavigator } from 'react-navigation';
import TabBarIconContainer from 'components/common/navigators/TabBarIconContainer';
import TabBarProfilePicture from 'components/common/navigators/TabBarProfilePicture';
import UserNavigator from 'containers/navigators/UserNavigator';
import SuggestionsNavigator from 'containers/navigators/SuggestionsNavigator';
import ParticipationsNavigator from 'containers/navigators/ParticipationsNavigator';
import colors from 'styles/colors';
import TabBarTop from './TabBarTop';

const SignedInNavigator = TabNavigator(
  {
    Participations: {
      screen: ParticipationsNavigator,
      navigationOptions: {
        title: 'Participations',
        tabBarIcon: props => <TabBarIconContainer {...props} tintColor={colors.meetup} name="heart" />,
      },
    },
    Suggestions: {
      screen: SuggestionsNavigator,
      navigationOptions: {
        title: 'Suggestions',
        tabBarIcon: props => <TabBarIconContainer {...props} name="albums" />,
      },
    },
    User: {
      screen: UserNavigator,
      navigationOptions: {
        title: 'User',
        tabBarIcon: props => <TabBarProfilePicture {...props} />,
      },
    },
  },
  {
    ...TabNavigator.Presets.AndroidTopTabs,
    tabBarComponent: TabBarTop,
    initialRouteName: 'Suggestions',
    tabBarOptions: {
      activeTintColor: colors.tinyBlue,
      inactiveTintColor: colors.tinyBlue,
      showIcon: true,
    },
  },
);

export default SignedInNavigator;
