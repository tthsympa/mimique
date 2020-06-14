// @flow

import React from 'react';
import { connect } from 'react-redux';
import Container from 'components/common/layout/Container';
import EventSectionList from 'containers/events/EventSectionList';
import EventListFooterPast from 'components/events/EventListFooterPast';
import type { EventsState, EventSection } from 'reduxTypes/events';
import styles from './styles';

type Props = {
  navigation: Object,
  events: EventsState,
};

type State = {
  eventSections: EventSection[],
  showPastEvents: boolean,
};

class Participations extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      eventSections: [],
      showPastEvents: false,
    };
    this.sectionLabels = {
      week: 'Cette semaine',
      upcoming: 'À Venir',
      past: 'Passé',
    };
  }

  componentWillMount() {
    this.refreshEvents(this.props.events);
    this.props.navigation.addListener('willBlur', () => {
      this.tooglePastEvents(false);
    });
    this.props.navigation.addListener('willFocus', () => {
      this.refreshEvents(this.props.events);
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.events.isLoading && !nextProps.events.isLoading) {
      this.refreshEvents(nextProps.events);
    }
  }

  sectionLabels: {
    ['week' | 'upcoming' | 'past']: string,
  };

  refreshEvents(eventState: EventsState) {
    const { showPastEvents } = this.state;
    const { all, participationsByTime } = eventState;
    const eventSections = [];

    const createSection = (eventIdxs, labelType) => ({
      title: this.sectionLabels[labelType],
      data: all
        .filter((e, idx) => eventIdxs.includes(idx))
        .sort((a, b) => new Date(a.beginDatetime) - new Date(b.beginDatetime)),
    });

    if (participationsByTime.week) {
      eventSections.push(createSection(participationsByTime.week, 'week'));
    }
    if (participationsByTime.upcoming) {
      eventSections.push(createSection(participationsByTime.upcoming, 'upcoming'));
    }
    if ((showPastEvents || eventSections.length === 0) && participationsByTime.past) {
      eventSections.push(createSection(participationsByTime.past, 'past'));
    }
    this.setState({ eventSections });
  }

  tooglePastEvents = (show = true) => {
    this.setState({ showPastEvents: show }, () => {
      this.refreshEvents(this.props.events);
    });
  }

  renderListFooter = () => {
    const { week, upcoming, past } = this.props.events.participationsByTime;
    const { showPastEvents } = this.state;
    const havePastEvents = (upcoming || week) && past && past.length > 0;
    if (havePastEvents && !showPastEvents) {
      return <EventListFooterPast onPress={this.tooglePastEvents} />;
    }
    return null;
  }

  render() {
    const { events, navigation } = this.props;
    const { eventSections } = this.state;
    return (
      <Container style={styles.container}>
        <EventSectionList
          isLoading={events.isLoading}
          eventSections={eventSections}
          navigation={navigation}
          isParticipations
          showPastEvents={() => this.tooglePastEvents()}
          ListFooterComponent={this.renderListFooter()}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  events,
});

export default connect(mapStateToProps)(Participations);
