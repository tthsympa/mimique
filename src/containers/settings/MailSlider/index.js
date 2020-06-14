// @flow

import Emoji from '@ardentlabs/react-native-emoji';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView, Platform } from 'react-native';
import { ioniconsByPlatform } from 'utils/ionicons';
import handleMail from 'utils/handleMail';
import services from 'config/services';
import styles from './styles';

type Props = {
  width: number,
  emoji: string,
};

type State = {
  opacity: number,
};

// eslint-disable-next-line react/prefer-stateless-function
class MailSlider extends React.Component<Props, State> {
  state = {
    opacity: 0,
  };

  scrollViewRef = null;

  handleScroll = (event: Object) => {
    const { x } = event.nativeEvent.contentOffset;
    const mailTriggerOffset: number = 105.0;
    this.setState({ opacity: ((event.nativeEvent.contentOffset.x * 1) / 100) - 0.02 });
    if (this.scrollViewRef && x > mailTriggerOffset) {
      this.scrollViewRef.scrollTo({ x: 0, y: 0, animated: false });
      this.setState({ opacity: 0 });
      handleMail(services.supportMailAdress);
    }
  };

  handleAndroidMail = (os: string) => {
    if (os === 'android') {
      handleMail(services.supportMailAdress);
    }
  };

  render() {
    const { width, emoji } = this.props;
    const os = Platform.OS;
    return (
      <View
        style={[styles.scrollView, { width }]}
      >
        {
          os === 'ios' &&
          <View style={[styles.emoji, { opacity: this.state.opacity }]}>
            <Text style={{ fontSize: 40 }}><Emoji name={emoji} /></Text>
          </View>
        }
        <ScrollView
          horizontal={os === 'ios'}
          onScroll={this.handleScroll}
          showsVerticalScrollIndicator
          scrollEventThrottle={3}
          ref={(r) => { this.scrollViewRef = r; }}
        >
          <View style={[styles.iconScroll, { width: width * 1.2 }]}>
            <Ionicons
              name={ioniconsByPlatform(os === 'ios' ? 'arrow-round-back' : 'mail-open', false)}
              size={64}
              color="#FFFFFF"
              onPress={() => this.handleAndroidMail(os)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MailSlider;
