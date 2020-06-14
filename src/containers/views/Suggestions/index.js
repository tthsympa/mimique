// @flow

import React from 'react';
import { connect } from 'react-redux';
import Container from 'components/common/layout/Container';
import EventSectionList from 'containers/events/EventSectionList';
import { eventsFetch } from 'actions/events';
import type { EventsState, EventSection } from 'reduxTypes/events';
import forEach from 'lodash/forEach';
import styles from './styles';

type Props = {
  navigation: Object,
  events: EventsState,
  dEventsFetch: typeof eventsFetch,
};

type State = {
  eventSections: EventSection[],
};

class Suggestions extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      eventSections: [],
    };
  }

  componentWillMount() {
    const { dEventsFetch, navigation } = this.props;
    dEventsFetch();
    navigation.addListener('willBlur', () => {
      this.refreshEvents(this.props.events);
    });
    navigation.addListener('willFocus', () => {
      this.refreshEvents(this.props.events);
    });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.events.isLoading && !nextProps.events.isLoading) {
      this.refreshEvents(nextProps.events);
    }
  }

  refreshEvents(eventState: EventsState) {
    const { all, suggestionsByCategories, categories } = eventState;
    const eventSections = [];
    const hasIdeals = !!all.find(e => e.mostPertinent === 2);
    const idealSection = hasIdeals ? [{
      title: 'Idéal pour toi 👌',
      data: all
        .filter(e => e.mostPertinent === 2)
        .sort((a, b) => new Date(a.beginDatetime) - new Date(b.beginDatetime)),
    }] : null;
    forEach(suggestionsByCategories, (eventIdx: number[], catId: string) => {
      const catIntId = parseInt(catId, 10);
      const category = categories.find(c => c.id === catIntId);
      if (category) {
        eventSections.push({
          title: category.name,
          data: all
            .filter((e, idx) => eventIdx.includes(idx) && e.mostPertinent < 2)
            .sort((a, b) => new Date(a.beginDatetime) - new Date(b.beginDatetime)),
        });
      }
    });
    this.setState({
      eventSections: idealSection
        ? [...idealSection, ...eventSections]
        : [...eventSections],
    });
  }

  render() {
    const { events, navigation, dEventsFetch } = this.props;
    const { eventSections } = this.state;
    return (
      <Container style={styles.container}>
        <EventSectionList
          isLoading={events.isLoading}
          eventSections={eventSections}
          navigation={navigation}
          refreshEvents={dEventsFetch}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ events }) => ({
  events,
});

const mapDispatchToProps = {
  dEventsFetch: eventsFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);
