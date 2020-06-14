// @flow

import { StackNavigator } from 'react-navigation';
import Participations from 'containers/views/Participations';
import EventDetailNavigator from '../EventDetailNavigator';

export default StackNavigator(
  {
    ParticipationsScreen: {
      screen: Participations,
    },
    EventDetailsScreen: {
      screen: EventDetailNavigator,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'ParticipationsScreen',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
