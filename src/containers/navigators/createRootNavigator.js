// @flow

import { StackNavigator } from 'react-navigation';
import Details from 'containers/views/Details';
import SignedInNavigator from './SignedInNavigator';
import SignedOutNavigator from './SignedOutNavigator';
import InitialScreen from './InitialScreen';

export default () => StackNavigator(
  {
    InitialScreen: {
      screen: InitialScreen,
    },
    SignedIn: {
      screen: SignedInNavigator,
    },
    SignedOut: {
      screen: SignedOutNavigator,
    },
    DetailsScreen: {
      screen: Details,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'InitialScreen',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
