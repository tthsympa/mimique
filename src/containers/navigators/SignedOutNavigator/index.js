// @flow

import { StackNavigator } from 'react-navigation';
import SignIn from 'containers/views/SignIn';

const SignedOutNavigator = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      header: null,
    },
  },
}, {
  navigationOptions: () => ({
    initialRouteName: 'SignIn',
  }),
});

export default SignedOutNavigator;
