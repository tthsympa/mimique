// @flow

import React from 'react';
import { Text, View, Image, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { logIn, logOut } from 'actions/user';
import SocialConnectButton from 'components/common/buttons/SocialConnectButton';
import SignInContainer from 'components/common/layout/SignInContainer';
import logo from 'assets/images/horizontal-mimique-logo-black.png';
import type { UserState } from 'reduxTypes/user';
import colors from 'styles/colors';
import styles from './styles';

type Props = {
  logInConnect: (string) => void,
  logOutConnect: () => void,
  user: UserState,
};

class SignIn extends React.Component<Props, Props> {
  constructor(props) {
    super(props);
    this.logInError = this.logInError.bind(this);
    this.displayErrorAlert = this.displayErrorAlert.bind(this);
  }

  logInError: Function;
  displayErrorAlert: Function;

  logInError(): boolean {
    const { logInError, logInErrorType }: UserState = this.props.user;
    return logInError && logInErrorType === 'error';
  }

  displayErrorAlert(): void {
    const { logOutConnect } = this.props;
    if (this.logInError()) {
      Alert.alert(
        'Connexion Impossible',
        'Nous nous efforçons de résoudre le problème dans les plus brefs délais. Merci de réessayer plus tard.',
        [
          { text: 'D\'accord :(', onPress: logOutConnect },
        ],
      );
    }
  }

  render() {
    const { logInConnect, user } = this.props;
    this.displayErrorAlert();
    const socials = ['facebook', 'google'];
    return (
      <SignInContainer style={styles.container}>

        <View style={styles.topContainer}>
          <View style={styles.topContent}>
            <Image
              source={logo}
              style={styles.logo}
            />
            <Text style={styles.tagLine}>
              Trouvez instantanément les événements locaux qui vous correspondent.
            </Text>
          </View>
        </View>

        <View style={styles.loader}>
          {user.logInProcessIsRunning && <ActivityIndicator color={colors.darkBlue} />}
        </View>

        <View style={styles.buttonsContainer}>
          {socials.map(social => (
            <SocialConnectButton
              key={social}
              onPress={() => logInConnect(social)}
              source={social}
            />
          ))}
        </View>

      </SignInContainer>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = {
  logInConnect: logIn,
  logOutConnect: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
