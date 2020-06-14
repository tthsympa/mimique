// @flow

import { StackNavigator } from 'react-navigation';
import Details from 'containers/views/Details';
import UserModal from 'containers/views/UserModal';

export default StackNavigator(
  {
    UserModal: {
      screen: UserModal,
    },
    DetailsScreen: {
      screen: Details,
    },
  },
  {
    headerMode: 'none',
    mode: 'card',
    initialRouteName: 'UserModal',
    navigationOptions: {
      gesturesEnabled: true,
    },
  },
);
