// @flow

import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import MailSlider from 'containers/settings/MailSlider';
import styles from './styles';

type Props = {
};

type State = {
  width: number,
};

// eslint-disable-next-line react/prefer-stateless-function
class Contact extends React.Component<Props, State> {
  state = {
    width: 0,
  }

  componentDidMount() {
    setTimeout(this.measureView);
  }

  descriptionText: string = 'Un problème ? Envie de discuter avec nous ? De nous rencontrer ?';
  sendText: string = 'Envoies nous un petit message qu\'on en parle !';
  iOSInstructionScrollText: string = 'Slides vers la gauche pour écrire ton mail';
  androidInstructionScrollText: string = 'Tapes sur l\'icone pour écrire ton mail';
  viewRef = null;

  measureView = () => {
    if (this.viewRef) {
      this.viewRef.measure((ox, oy, width) => {
        const padding = 0;
        this.setState({ width: width - padding });
      });
    }
  }

  render() {
    const { width } = this.state;
    return (
      <View
        style={styles.container}
        ref={(r) => { this.viewRef = r; }}
      >
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{this.descriptionText}</Text>
          <Text style={styles.descriptionText}>{this.sendText}</Text>
          <Text style={styles.instructionText}>{Platform.OS === 'ios' ? this.iOSInstructionScrollText : this.androidInstructionScrollText}</Text>
        </View>
        <MailSlider
          width={width}
          emoji="mega"
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
});

export default connect(mapStateToProps)(Contact);
