// @flow

import React from 'react';
import { View, TouchableWithoutFeedback, Slider, Keyboard, Text, Image, TextInput, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { Location, Permissions } from 'expo';
import Container from 'components/common/layout/Container';
import colors from 'styles/colors';
import type { User, UserState, Providers } from 'reduxTypes/user';
import { connect } from 'react-redux';
import { eraseUser, providersFetch, changeMail, getEventDistanceMax, changeEventDistanceMax, sendUserLocation } from 'actions/user';
import Button from 'components/common/buttons/Button';
import Badge from 'components/common/bulk/Badge';
import capitalize from 'lodash/capitalize';
import Sentry from 'sentry-expo';
import styles from './styles';

type Props = {
  user: User,
  userState: UserState,
  providers: Providers[],
  deraseUser: typeof eraseUser,
  dprovidersFetch: typeof providersFetch,
  dgetEventDistanceMax: typeof getEventDistanceMax,
  dchangeEventDistanceMax: typeof changeEventDistanceMax,
  dchangeMail: typeof changeMail,
  dsendUserLocation: typeof sendUserLocation,
};

type State = {
  newEmail: string,
  invalidEmail: boolean,
  newDistanceMax: number,
};

const accountItems = [
  {
    type: 'Facebook',
    isLoggedWith: false,
    color: colors.facebook,
  },
  {
    type: 'Google',
    isLoggedWith: false,
    color: colors.google,
  },
  {
    type: 'Meetup',
    isLoggedWith: false,
    color: colors.meetup,
  },
];

class Profile extends React.Component<Props, State> {
  state = {
    newEmail: '',
    invalidEmail: true,
    newDistanceMax: 0,
  };

  componentDidMount() {
    const { dprovidersFetch, dgetEventDistanceMax } = this.props;
    dprovidersFetch();
    dgetEventDistanceMax();
  }

  componentDidUpdate() {
    const { user } = this.props;
    const { newDistanceMax } = this.state;
    if (!newDistanceMax && user.distanceMaxEvent) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        newDistanceMax: user.distanceMaxEvent,
      });
    }
  }

  onChange = (e) => {
    const { newEmail } = this.state;
    const tmp = e;
    if (tmp !== newEmail && this.testMailWithRE(e)) {
      this.setState({
        newEmail: e,
        invalidEmail: false,
      });
    } else {
      this.setState({
        invalidEmail: true,
      });
    }
  };

  testMailWithRE = (mail: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail.toLowerCase());
  }

  changeMail = () => {
    const { newEmail } = this.state;
    const { dchangeMail } = this.props;
    dchangeMail(newEmail);
  };

  isLoggedWith = (account, providers): boolean => (
    providers.some(provider => account.type === capitalize(provider.type))
  );

  deleteAccount = () => {
    const { deraseUser } = this.props;
    deraseUser();
  };

  radiusChange = (event) => {
    this.setState({
      newDistanceMax: Math.trunc(event),
    });
  };

  changeDistanceMax = async () => {
    const { user, dchangeEventDistanceMax, dsendUserLocation } = this.props;
    const { isLoading } = this.props.userState;
    const { newDistanceMax } = this.state;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Les évènements proposés seront moins pertinents puisqu\'ils ne seront pas géolocalisés.');
      Sentry.captureMessage('Location status is not granted.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    dsendUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    if (newDistanceMax !== user.distanceMaxEvent && !isLoading) {
      dchangeEventDistanceMax(newDistanceMax);
    }
  };

  render() {
    const { user, providers } = this.props;
    const { isLoading } = this.props.userState;
    const { invalidEmail, newDistanceMax } = this.state;
    const accounts = providers
      ? accountItems.map(account => (
        Object.assign({}, account, {
          isLoggedWith: this.isLoggedWith(account, providers),
        })))
      : null;
    if (accounts && user.distanceMaxEvent) {
      return (
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.infos}>
              <Image
                style={[
                styles.profilePicture,
              ]}
                source={{ uri: user.avatarUrl }}
              />
              <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
              <View style={styles.badgeContainer}>
                {
                  accounts.map(provider => (
                    <Badge
                      key={provider.type}
                      color={provider.isLoggedWith
                      ? provider.color
                      : colors.gray}
                      label={provider.type}
                    />
                  ))
                }
              </View>
            </View>
            <KeyboardAvoidingView style={styles.emailZone} behavior="padding" keyboardVerticalOffset={60}>
              <TextInput
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={user.email}
                placeholderTextColor={colors.lightBlue}
                selectionColor={colors.skyBlue}
                onChangeText={e => this.onChange(e)}
                underlineColorAndroid="transparent"
              />
              <Button
                style={styles.button}
                text="Changer"
                textColor={colors.blue}
                type="neutral"
                disabled={invalidEmail}
                onPress={this.changeMail}
              />
              <View style={{ height: 60 }} />
            </KeyboardAvoidingView>
            <View style={styles.radiusLocation}>
              <Text style={styles.radiusText}>
                {'Mimique va rechercher des évènements jusqu\'à '}
                <Text style={styles.radiusNumber}>{newDistanceMax}</Text>
                {'km autour de toi !'}
              </Text>
              <Slider
                value={user.distanceMaxEvent}
                maximumValue={250}
                minimumValue={10}
                onValueChange={this.radiusChange}
                onSlidingComplete={this.changeDistanceMax}
                disabled={isLoading}
              />
            </View>
            <View style={styles.delete}>
              <Button
                onPress={this.deleteAccount}
                type="error"
                text="Supprimer votre compte"
                textColor="white"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <Container center>
        <ActivityIndicator color={colors.white} size="large" />
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userState: user,
  user: user.user,
  providers: user.user.providers,
});

const mapDispatchToProps = {
  deraseUser: eraseUser,
  dprovidersFetch: providersFetch,
  dgetEventDistanceMax: getEventDistanceMax,
  dchangeEventDistanceMax: changeEventDistanceMax,
  dchangeMail: changeMail,
  dsendUserLocation: sendUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
