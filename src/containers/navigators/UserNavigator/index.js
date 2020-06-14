// @flow

import { StackNavigator } from 'react-navigation';
import User from 'containers/views/User';
import DetailsNavigator from 'containers/navigators/DetailsNavigator';

export default StackNavigator(
  {
    UserScreen: {
      screen: User,
    },
    UserModal: {
      screen: DetailsNavigator,
      navigationOptions: {
        swipeEnabled: false,
        tabBarVisible: false,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'UserScreen',
    navigationOptions: {
      gesturesEnabled: true,
    },
  },
);
