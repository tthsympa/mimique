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
class Suggestion extends React.Component<Props, State> {
  state = {
    width: 0,
  }

  componentDidMount() {
    setTimeout(this.measureView);
  }

  descriptionText: string = 'Nous sommes à ton écoute, alors n\'hésites pas à nous écrire !';
  descriptionText2: string = 'Parles nous ce que tu souhaites voir dans Mimique !';
  descriptionText3: string = 'Nos developpeurs s\'y attéleront 💪';
  iOSInstructionScrollText: string = 'Slides vers la gauche pour écrire ton mail';
  androidInstructionScrollText: string = 'Tapes sur l\'icone pour écrire ton mail';
  viewRef: any = null;

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
          <Text style={styles.descriptionText}>{this.descriptionText2}</Text>
          <Text style={[styles.descriptionText, { textAlign: 'center', fontWeight: '200' }]}>{this.descriptionText3}</Text>
          <Text style={styles.instructionText}>{Platform.OS === 'ios' ? this.iOSInstructionScrollText : this.androidInstructionScrollText}</Text>
        </View>
        <MailSlider
          width={width}
          emoji="writing_hand"
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
});

export default connect(mapStateToProps)(Suggestion);
