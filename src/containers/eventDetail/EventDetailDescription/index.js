// @flow

import React from 'react';
import { View, Text, LayoutAnimation } from 'react-native';
import EventDetailIoniButton from 'components/eventDetail/EventDetailIoniButton';

import styles from './styles';

type Props = {
  data: any
};

type State = {
  more: boolean,
  textBig: boolean,
};

const CustomAnimation = {
  duration: 800,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.9,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.7,
  },
};

class EventDetailDescription extends React.Component<Props, State> {
  state = {
    more: false,
    textBig: false,
  }

  onChangeMore = () => {
    LayoutAnimation.configureNext(CustomAnimation);
    if (this.state.more) {
      this.setState({ more: false });
    } else {
      this.setState({ more: true });
    }
  }

  test = (evt: any) => {
    if (evt.nativeEvent.layout.height > 51) {
      this.setState({ textBig: true });
    }
  }

  render() {
    const event = this.props.data;
    return (
      <View>
        <Text style={styles.titleManager}>Description</Text>
        <View style={styles.root}>
          <Text
            numberOfLines={this.state.textBig && this.state.more ? -1 : 4}
            onLayout={this.test}
          >
            {event.description}
          </Text>
          {
            this.state.textBig &&
              <EventDetailIoniButton onPress={() => this.onChangeMore()} state={this.state.more} />
          }
        </View>
      </View>
    );
  }
}

export default EventDetailDescription;
