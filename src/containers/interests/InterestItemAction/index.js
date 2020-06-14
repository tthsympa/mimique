// @flow

import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';
import styles from './styles';

type Props = {
  isInUserInterest: boolean,
  onPress: Function,
};

type State = {
  focused: boolean,
};

export default class EventItemAction extends React.Component<Props, State> {
  static defaultProps = {

  }

  constructor(props: Props) {
    super(props);
    this.handleOnPressIn = this.handleOnPressIn.bind(this);
    this.handleOnPressOut = this.handleOnPressOut.bind(this);
  }

  state = {
    focused: false,
  }

  handleOnPressIn: Function;
  handleOnPressOut: Function;

  handleOnPressIn() {
    this.setState({ focused: true });
  }

  handleOnPressOut() {
    this.setState({ focused: false });
  }

  render() {
    const { isInUserInterest, onPress } = this.props;
    const { focused } = this.state;
    const action = isInUserInterest ? 'remove' : 'add';

    const buttonStyle = StyleSheet.flatten([
      styles.button,
      styles[action],
    ]);

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handleOnPressIn}
        onPressOut={this.handleOnPressOut}
        onPress={onPress(isInUserInterest)}
      >
        <View style={styles.container}>
          <Ionicons
            name={ioniconsByPlatform(`${action}-circle`, focused)}
            size={30}
            style={buttonStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
