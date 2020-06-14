// @flow

import React from 'react';
import { View, Text, SectionList, RefreshControl } from 'react-native';
import EventItem from 'containers/events/EventItem';
import EventSectionHeader from 'components/events/EventSectionHeader';
import EventItemSeparator from 'components/events/EventItemSeparator';
import EventEmptyPlaceholder from 'components/events/EventEmptyPlaceholder';
import EventFilterContainer from 'components/events/EventFilterContainer';
import EventTextFilter from 'components/events/EventTextFilter';
import EventDateFilter from 'components/events/EventDateFilter';
import moment from 'moment';
import { colors } from 'styles';
import isEqual from 'lodash/isEqual';
import type { Element } from 'react';
import type { Event } from 'reduxTypes/events';

import styles from './styles';

type FilterType = 'title' | 'date' | 'city';
type Filters = {
  [FilterType]: string | null,
};

type Props = {
  navigation: Object,
  eventSections: Object[], // Todo: Use EventSection
  isLoading: boolean,
  isParticipations?: boolean,
  showPastEvents?: Function,
  ListFooterComponent?: null | Element<*>,
  refreshEvents: Function,
};

type State = {
  filterOpened: boolean,
  filters: Filters,
  eventSections: Object[], // Todo: Use EventSection
};

class EventSectionList extends React.Component<Props, State> {
  static defaultProps = {
    isParticipations: false,
    showPastEvents: () => { },
    ListFooterComponent: null,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      filterOpened: true,
      filters: {},
      eventSections: [],
    };
  }

  componentWillMount() {
    const { eventSections } = this.props;
    this.setState({ eventSections });
  }

  // This is bad :(
  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(this.props.eventSections, nextProps.eventSections)) {
      this.setState({ eventSections: nextProps.eventSections });
    }
  }

  velocityThreshold = 25;
  scrollDelay = 50;
  lastPos = null;
  newPos = 0;
  timer = null;
  delta = 0;

  clearScrollVelocity = () => {
    this.lastPos = null;
    this.delta = 0;
  }

  checkScrollVelocity = (newPos: number) => {
    this.clearScrollVelocity();
    if (this.lastPos !== null) {
      this.delta = newPos - this.lastPos;
    }
    this.lastPos = newPos;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.clearScrollVelocity, this.scrollDelay);
  }

  manageScroll = (event: Object) => {
    const { y: newPos } = event.nativeEvent.contentOffset;
    this.checkScrollVelocity(newPos);
    if (Math.abs(this.delta) < this.velocityThreshold) {
      return;
    }
    this.setState(({ filterOpened }) => {
      if (this.delta > this.velocityThreshold && filterOpened) {
        // console.info('Hide !');
        return { filterOpened: false };
      } else if (this.delta < this.velocityThreshold && !filterOpened) {
        // console.info('Show !');
        return { filterOpened: true };
      }
      return {};
    });
  }

  handleFilterChange = (type: FilterType) => (value: string) => {
    this.setState(state => ({
      filters: {
        ...state.filters,
        [type]: value && value.length > 0 ? value : null,
      },
    }), this.filter);
  }

  handleFilterClear = (type: FilterType) => () => {
    this.setState(state => ({
      filters: {
        ...state.filters,
        [type]: null,
      },
    }), this.filter);
  }

  filter = () => {
    const { eventSections } = this.props;
    const { filters } = this.state;
    const filteredSections = [];

    const fTitle = filters.title && filters.title.length > 0
      ? filters.title.trim().toLowerCase()
      : null;

    const fDate = filters.date && filters.date.length > 0
      ? moment(filters.date, 'DD-MM-YYYY')
      : null;

    const fCity = filters.city && filters.city.length > 0
      ? filters.city.trim().toLowerCase()
      : null;

    if (fTitle === null && fDate === null && fCity === null) {
      this.setState({ eventSections });
      return;
    }

    eventSections.forEach((section) => {
      const filteredEvents = section.data.filter((event: Event) => {
        const titleCond =
          (fTitle && event.title.toLowerCase().indexOf(fTitle) !== -1)
          || (fTitle === null);

        const dateConf =
          (fDate && fDate.isSame(event.beginDatetime, 'day'))
          || (fDate === null);

        const cityCond =
          (fCity && event.city.toLowerCase().indexOf(fCity) !== -1)
          || (fCity === null);

        return titleCond && dateConf && cityCond;
      });
      if (filteredEvents.length > 0) {
        filteredSections.push({ ...section, data: filteredEvents });
      }
    });
    this.setState({ eventSections: filteredSections });
  }

  renderListHeader = () => {
    const { filters, filterOpened, eventSections } = this.state;
    const plural = eventSections.length > 0 && eventSections[0].data > 1;
    const title = this.props.isParticipations
      ? `Participation${plural ? 's' : ''}`
      : `Suggestion${plural ? 's' : ''}`;

    return (
      <View>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        {
          filterOpened &&
          <View style={styles.filterContainer}>
            <EventFilterContainer>
              <EventTextFilter
                iconName="search"
                value={filters.title || ''}
                onChange={this.handleFilterChange('title')}
                onClear={this.handleFilterClear('title')}
              />
              <EventDateFilter
                iconName="calendar"
                value={filters.date || ''}
                onChange={this.handleFilterChange('date')}
                onClear={this.handleFilterClear('date')}
              />
              <EventTextFilter
                iconName="compass"
                value={filters.city || ''}
                onChange={this.handleFilterChange('city')}
                onClear={this.handleFilterClear('city')}
              />
            </EventFilterContainer>
          </View>
        }
      </View>
    );
  }

  render() {
    const {
      isLoading, navigation, ListFooterComponent, refreshEvents, isParticipations,
    } = this.props;
    const { eventSections } = this.state;

    // if (isLoading && eventSections.length > 0) {
    //   return (
    //     <View style={styles.loaderContainer}>
    //       <ActivityIndicator color={colors.white} size="large" />
    //     </View>
    //   );
    // }

    const ListEmptyComponent = (
      <EventEmptyPlaceholder
        label={isParticipations ? 'Pas d\'évènement à venir...' : undefined}
      />
    );

    return (
      <SectionList
        renderItem={section => <EventItem {...section} navigation={navigation} />}
        renderSectionHeader={({ section }) => <EventSectionHeader isIdeal={section.title === 'Idéal pour toi 👌'} title={section.title} />}
        sections={eventSections}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={EventItemSeparator}
        scrollEventThrottle={6}
        ListHeaderComponent={this.renderListHeader()}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshEvents}
            tintColor={colors.white} // For IOS
            colors={[colors.white, colors.blue]} // For android
          />
        }
      />
    );
  }
}

export default EventSectionList;
