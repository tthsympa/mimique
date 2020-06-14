// @flow

import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import AccountItem from 'components/user/AccountItem';
import { providersFetch, addProvider, deleteProvider } from 'actions/user';
import type { User, SocialConnectSource, Providers } from 'reduxTypes/user';
import capitalize from 'lodash/capitalize';
import googleLogo from 'assets/images/google-logo.png';
import fbLogo from 'assets/images/fb-logo.png';
import meetupLogo from 'assets/images/meetup-logo.png';
import Container from 'components/common/layout/Container';
import { colors } from 'styles';
// import inLogo from 'assets/images/in-logo.png';
// import eventLogo from 'assets/images/event-logo.png';
import styles from './styles';

type Props = {
  userInfos: User,
  providers: Providers[],
  dprovidersFetch: typeof providersFetch,
  daddProvider: typeof addProvider,
  ddeleteProvider: typeof deleteProvider,
};

const accountItems = [
  {
    type: 'Facebook',
    logo: fbLogo,
    isLoggedWith: false,
  },
  {
    type: 'Google',
    logo: googleLogo,
    isLoggedWith: false,
  },
  {
    type: 'Meetup',
    logo: meetupLogo,
    isLoggedWith: false,
  },
  // {
  //   type: 'Linkedin',
  //   logo: inLogo,
  //   isLoggedWith: false,
  // },
  // {
  //   type: 'EventBrite',
  //   logo: eventLogo,
  //   isLoggedWith: false,
  // },
];

class Accounts extends React.Component<Props> {
  componentWillMount() {
    const { dprovidersFetch } = this.props;
    dprovidersFetch();
  }

  onChange = (isLoggedWith: boolean, service: SocialConnectSource, id = -1) => {
    const { daddProvider, ddeleteProvider, userInfos } = this.props;
    if (isLoggedWith) {
      if (id) {
        ddeleteProvider(id);
      }
    } else {
      daddProvider(service, userInfos.authToken);
    }
  };

  isLoggedWith = (account, providers): Object => {
    const isLoggedWith = providers.some(provider => account.type === capitalize(provider.type));
    if (isLoggedWith) {
      const id = providers.map(provider =>
        (account.type === capitalize(provider.type) ? provider.id : undefined))
        .filter(v => v)[0];
      return { isLoggedWith, id };
    }
    return { isLoggedWith };
  }

  descriptionText: string = 'Tu peux associer ces services à Mimique pour améliorer la pertinence des évènements que nous te proposeront';

  render() {
    const { providers } = this.props;
    const accounts = providers
      ? accountItems.map(account => (
        Object.assign({}, account, {
          ...this.isLoggedWith(account, providers),
        })))
      : null;
    if (accounts) {
      const onlyOneAccount: boolean = providers.length === 1;
      return (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{this.descriptionText}</Text>
            </View>
            <View style={styles.capsule}>
              {
                accounts.map((item, index) => (
                  <AccountItem
                    key={item.type}
                    provider={item}
                    index={index}
                    length={accountItems.length}
                    onlyOneAccount={onlyOneAccount}
                    onChange={this.onChange}
                  />
                ))
              }
            </View>
          </ScrollView>
        </View>
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
  userInfos: user.user,
  providers: user.user.providers,
});

const mapDispatchToProps = {
  dprovidersFetch: providersFetch,
  daddProvider: addProvider,
  ddeleteProvider: deleteProvider,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
