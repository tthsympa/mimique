// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import Container from 'components/common/layout/Container';
import EventDetailManager from 'components/eventDetail/EventDetailManager';
import EventDetailHeader from 'components/eventDetail/EventDetailHeader';
import EventDetailParticipant from 'components/eventDetail/EventDetailParticipant';
import EventDetailNotification from 'components/eventDetail/EventDetailNotification';
import EventDetailBackButton from 'components/eventDetail/EventDetailBackButton';
import EventDetailShare from 'components/eventDetail/EventDetailShare';

import { colors } from 'styles';

import {
  eventsCreateParticipation, eventsDeleteParticipation, eventsHideInterest, eventsParticipants, fetchEventById,
} from 'actions/events';

import type { EventsState } from 'reduxTypes/events';

import EventDetailDescription from '../../eventDetail/EventDetailDescription';
import EventDetailCarousel from '../../eventDetail/EventDetailCarousel';

import styles from './styles';

type Props = {
  navigation: Object,
  events: EventsState,
  dEventsCreateParticipation: typeof eventsCreateParticipation,
  dEventsDeleteParticipation: typeof eventsDeleteParticipation,
  dEventsHideInterest: typeof eventsHideInterest,
  dEventsParticipants: typeof eventsParticipants,
  dFetchEventById: typeof fetchEventById,
};

type State = {
};

// eslint-disable-next-line react/prefer-stateless-function
class EventsDetail extends React.Component<Props, State> {
  componentWillMount() {
    const eventIdx = this.props.navigation.state.params.eventId;
    this.props.dEventsParticipants(eventIdx);
    const localEvent = this.getCurrentEvent();
    if (!localEvent) {
      this.props.dFetchEventById(eventIdx);
    }
  }

  getCurrentEvent = () => {
    const eventIdx = this.props.navigation.state.params.eventId;
    const events = this.props.events.all;
    const localEvent = events.find(item => item.id === eventIdx);
    return localEvent;
  }

  render() {
    const currentEvent = this.getCurrentEvent();
    const { participants } = this.props.events; // Whhat ???
    if (!currentEvent) {
      return (
        <Container center>
          <ActivityIndicator color={colors.white} size="large" />
        </Container>
      );
    }
    return (
      <Container style={styles.root}>
        <View style={styles.header}>
          <View style={styles.caroussel}>
            <EventDetailCarousel data={currentEvent} />
          </View>
          <View style={styles.buttonBack}>
            <EventDetailBackButton navigation={this.props.navigation} />
          </View>
        </View>
        <View style={styles.body}>
          <EventDetailHeader
            data={currentEvent}
            addParticipation={this.props.dEventsCreateParticipation}
            deleteParticipation={this.props.dEventsDeleteParticipation}
            hideInterest={this.props.dEventsHideInterest}
          />
          <View style={styles.boxInfo}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              flexGrow={1}
              style={styles.scrollView}
            >
              <EventDetailManager
                navigation={this.props.navigation}
                data={currentEvent}
              />
              <EventDetailDescription data={currentEvent} />
              {
                !!participants && participants.length > 0
                && (
                <EventDetailParticipant
                  navigation={this.props.navigation}
                  data={participants}
                />
                )
              }
              {
                currentEvent.participates
                && <EventDetailNotification data={currentEvent} />
              }
              <View>
                <EventDetailShare event={currentEvent} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  events,
});

const mapDispatchToProps = {
  dEventsCreateParticipation: eventsCreateParticipation,
  dEventsDeleteParticipation: eventsDeleteParticipation,
  dEventsHideInterest: eventsHideInterest,
  dEventsParticipants: eventsParticipants,
  dFetchEventById: fetchEventById,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsDetail);
