// @flow

import React from 'react';
import { View, ScrollView, Text, Switch, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getGeneralNotifConfig, changeGeneralNotifConfig } from 'actions/user';
import type { User } from 'reduxTypes/user';
import Container from 'components/common/layout/Container';
import colors from 'styles/colors';
import styles from './styles';

type Props = {
  user: User,
  dgetGeneralNotifConfig: typeof getGeneralNotifConfig,
  dchangeGeneralNotifConfig: typeof changeGeneralNotifConfig,
};

// eslint-disable-next-line react/prefer-stateless-function
class Notifications extends React.Component<Props> {
  componentDidMount() {
    const { user, dgetGeneralNotifConfig } = this.props;
    if (!user.notifs) {
      dgetGeneralNotifConfig();
    }
  }

  onChange = (type: string) => {
    const { dchangeGeneralNotifConfig } = this.props;
    dchangeGeneralNotifConfig(type);
  };

  descriptionText: string = 'Tu peux choisir tes préférences pour les notifications ici. Des options plus précises sont présentes dans les évènements';
  render() {
    const { notifs } = this.props.user;

    if (notifs) {
      return (
        <View style={styles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{this.descriptionText}</Text>
            </View>
            <View style={styles.capsule}>
              <View style={styles.item}>
                <View style={[styles.elem, { borderBottomWidth: 0.5 }]}>
                  <View style={styles.textElem}>
                    <Text style={styles.accountText}>
                      Je souhaite recevoir des notifications push
                    </Text>
                  </View>
                  <View style={styles.switchElem}>
                    <Switch
                      style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                      onValueChange={() => this.onChange('push')}
                      onTintColor={colors.greenBlue}
                      tintColor={colors.fadedBlue}
                      value={notifs.push}
                    />
                  </View>
                </View>
                <View style={styles.elem}>
                  <View style={styles.textElem}>
                    <Text style={styles.accountText}>
                      Je souhaite recevoir des alertes par e-mail
                    </Text>
                  </View>
                  <View style={styles.switchElem}>
                    <Switch
                      style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                      onValueChange={() => this.onChange('mail')}
                      onTintColor={colors.greenBlue}
                      tintColor={colors.fadedBlue}
                      value={notifs.mail}
                    />
                  </View>
                </View>
              </View>
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

const mapDispatchToProps = {
  dgetGeneralNotifConfig: getGeneralNotifConfig,
  dchangeGeneralNotifConfig: changeGeneralNotifConfig,
};

const mapStateToProps = ({ user }) => ({
  user: user.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
