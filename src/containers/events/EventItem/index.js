// @flow

import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import EventSquare from 'components/events/EventSquare';
import EventItemContent from 'containers/events/EventItemContent';
import type { Event } from 'reduxTypes/events';
import moment from 'moment';
import EventItemAction from '../EventItemAction';
import styles from './styles';

type Props = {
  item: Event,
  index: number,
  section: Object,
  navigation: Object,
};

export default class EventItem extends React.Component<Props, Props> {
  static defaultProps = {

  }

  get isLastItem(): boolean {
    const { index, section } = this.props;
    return index === section.data.length - 1;
  }

  get isFirstItem(): boolean {
    const { index } = this.props;
    return index === 0;
  }

  openEventDetails = () => {
    const { navigation, item: { id } } = this.props;
    navigation.navigate('EventDetailsScreen', { eventId: id });
  }

  render() {
    const {
      item: {
        id,
        title,
        beginDatetime,
        city,
        interests,
        participates,
      },
    } = this.props;
    const notPast = moment(beginDatetime).isAfter(moment());
    const containerStyle = StyleSheet.flatten([
      styles.container,
      this.isFirstItem ? styles.firstItem : null,
      this.isLastItem ? styles.lastItem : null,
    ]);
    return (
      <TouchableHighlight onPress={this.openEventDetails}>
        <View style={containerStyle}>
          <View style={styles.square}>
            <EventSquare dateTime={beginDatetime} />
          </View>
          <View style={styles.content}>
            <EventItemContent
              title={title}
              location={city}
              interests={interests}
            />
          </View>
          <View style={styles.action}>
            {
              notPast &&
              <EventItemAction
                initialAction={participates ? 'delete' : 'add'}
                eventId={id}
              />
            }
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
