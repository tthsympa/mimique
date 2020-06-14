// @flow

import React from 'react';
import {
  View, Text, ScrollView, Platform,
} from 'react-native';
import { connect } from 'react-redux';
import Emoji from '@ardentlabs/react-native-emoji';
import { logOut } from 'actions/user';
import UserCapsule from 'components/user/UserCapsule';
import LogOutButton from 'components/common/buttons/LogOutButton';
import Settings from 'containers/settings';
import Container from 'components/common/layout/Container';
import styles from './styles';

type Props = {
  logOutConnect: () => void,
};

type State = {
  opacity: number,
};

const options = [
  {
    category: 'Gestion du compte',
    elems: [
      { name: 'Identité', 'node': Settings.Profile },
      { name: 'Notifications', 'node': Settings.Notifications },
      { name: 'Personaliser mes intérêts', 'node': Settings.Interests },
      { name: 'Mes comptes', 'node': Settings.Accounts },
      { name: 'Mes disponibilités', 'node': Settings.Dispo },
    ],
  },
  {
    category: 'Divers',
    elems: [
      { name: 'Écrire une suggestion', 'node': Settings.Suggestion },
      { name: 'Noter Mimique', 'node': Settings.Note },
      { name: 'À propos', 'node': Settings.About },
      { name: 'Nous contacter', 'node': Settings.Contact },
    ],
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class User extends React.Component<Props, State> {
  state = { opacity: 0 };

  handleScroll = (event: Object) => {
    const opacity = ((event.nativeEvent.contentOffset.y * -1) / 100) - 0.04;
    this.setState({ opacity });
  }

  render() {
    const { logOutConnect } = this.props;
    return (
      <Container style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={this.handleScroll}
          scrollEventThrottle={3}
          contentOffset={{ x: 0, y: 95 }}
          contentInset={{ top: -95 }}
        >
          {
            Platform.OS === 'ios'
            && (
            <View style={[styles.surprise, { opacity: this.state.opacity }]}>
              <Text style={{ fontSize: 50 }}><Emoji name="eggplant" /></Text>
            </View>
            )
          }
          {
            options.map(option => (
              <UserCapsule
                key={option.category}
                category={option.category}
                elems={option.elems}
              />
            ))
          }
          <LogOutButton logOutConnect={logOutConnect} />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
});

const mapDispatchToProps = {
  logOutConnect: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
