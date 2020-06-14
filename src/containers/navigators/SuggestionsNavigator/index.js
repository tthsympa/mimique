// @flow

import { StackNavigator } from 'react-navigation';
import Suggestions from 'containers/views/Suggestions';
import EventDetailNavigator from '../EventDetailNavigator';

export default StackNavigator(
  {
    SuggestionsScreen: {
      screen: Suggestions,
    },
    EventDetailsScreen: {
      screen: EventDetailNavigator,
      navigationOptions: {
        swipeEnabled: false,
        tabBarVisible: false,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'SuggestionsScreen',
    navigationOptions: {
      gesturesEnabled: true,
    },
  },
);
