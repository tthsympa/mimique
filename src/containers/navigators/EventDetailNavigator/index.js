// @flow

import { StackNavigator } from 'react-navigation';
import EventDetailsScreen from 'containers/views/EventDetails';
import EventDetailOrganisatorModal from 'components/eventDetail/EventDetailOrganisatorModal';
import EventDetailParticipantModal from 'components/eventDetail/EventDetailParticipantModal';

export default StackNavigator(
  {
    EventDetailsScreen: {
      screen: EventDetailsScreen,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    OrganizerModal: {
      screen: EventDetailOrganisatorModal,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    ParticipantModal: {
      screen: EventDetailParticipantModal,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'card',
    initialRouteName: 'EventDetailsScreen',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
