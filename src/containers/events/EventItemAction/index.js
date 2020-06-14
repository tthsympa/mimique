// @flow

import React from 'react';
import { connect } from 'react-redux';
import { eventsCreateParticipation, eventsDeleteParticipation } from 'actions/events';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ioniconsByPlatform } from 'utils/ionicons';
import debounce from 'lodash/debounce';
import styles from './styles';

type ActionType = 'add' | 'delete';

type Props = {
  initialAction: ActionType,
  eventId: number,
  dEventsCreateParticipation: typeof eventsCreateParticipation,
  dEventsDeleteParticipation: typeof eventsDeleteParticipation,
};

type State = {
  action: ActionType,
  focused: boolean,
};

class EventItemAction extends React.Component<Props, State> {
  state = {
    action: 'add',
    focused: false,
  }

  componentWillMount() {
    this.setState({
      action: this.props.initialAction,
    });
  }

  handleOnPress = () => {
    const { eventId, dEventsCreateParticipation, dEventsDeleteParticipation } = this.props;
    const { action } = this.state;
    if (action === 'add') {
      debounce(dEventsCreateParticipation, 500)(eventId);
      this.setState({ action: 'delete' });
    } else {
      debounce(dEventsDeleteParticipation, 500)(eventId);
      this.setState({ action: 'add' });
    }
  }

  handleOnPressIn = () => {
    this.setState({ focused: true });
  }

  handleOnPressOut = () => {
    this.setState({ focused: false });
  }

  render() {
    const { action, focused } = this.state;

    const buttonStyle = StyleSheet.flatten([
      styles.button,
      styles[action],
    ]);

    const iconPrefixName = action === 'delete' ? 'remove' : 'add';

    return (
      <TouchableWithoutFeedback
        onPress={this.handleOnPress}
        onPressIn={this.handleOnPressIn}
        onPressOut={this.handleOnPressOut}
      >
        <View style={styles.container}>
          <Ionicons
            name={ioniconsByPlatform(`${iconPrefixName}-circle`, focused)}
            size={30}
            style={buttonStyle}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = {
  dEventsCreateParticipation: eventsCreateParticipation,
  dEventsDeleteParticipation: eventsDeleteParticipation,
};

export default connect(null, mapDispatchToProps)(EventItemAction);
