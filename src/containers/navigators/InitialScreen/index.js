// @flow

import React from 'react';
import { Alert, AppState } from 'react-native';
import {
  Permissions, Notifications, Location, DangerZone,
} from 'expo';
import { connect } from 'react-redux';
import Sentry from 'sentry-expo';
import { withNavigation } from 'react-navigation';
import type { UserState } from 'reduxTypes/user';
import Welcome from 'containers/views/Welcome';
import { initExpoNotif, sendUserLocation } from 'actions/user';
import SignedInNavigator from '../SignedInNavigator';
import SignedOutNavigator from '../SignedOutNavigator';

const { Branch } = DangerZone;

type AppStateStatus = typeof AppState.currentState;

type Props = {
  user: UserState,
  dInitExpoNotif: typeof initExpoNotif,
  dSendUserLocation: typeof sendUserLocation,
  navigation: Object,
};

type State = {
  appState: AppStateStatus,
  pendingDLRoute: string | null,
};

class InitialScreen extends React.Component<Props, State> {
  state = {
    appState: AppState.currentState,
    pendingDLRoute: null,
  };

  unsubscribeFromBranch = null;

  notificationSubscription = null;

  componentDidMount() {
    if (this.props.user.isLoggedIn) {
      this.sendLocation();
      this.registerForPushNotificationsAsync();
      this.listenPushNotifications();
    }
    // Sentry.captureMessage(`InitialScreen.componentDidMount ${JSON.stringify(this.props.user)} ${this.unsubscribeFromBranch}`)
    if (!this.unsubscribeFromBranch) {
      this.unsubscribeFromBranch = this.deepLink();
    }
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.isLoggedIn) {
      if (!prevProps.user.isLoggedIn) {
        this.registerForPushNotificationsAsync();
      }
      if (this.notificationSubscription) {
        this.listenPushNotifications();
      }
      if (prevProps.user.user.location === undefined) {
        this.sendLocation();
      }
    }

    const needToDLRoute = (
      this.props.user.isLoggedIn
      && this.props.user.user
      && !this.props.user.user.isFirstLogin
      && this.state.pendingDLRoute
    );

    // Sentry.captureMessage(`InitialScreen.componentDidUpdate ${needToDLRoute} ${JSON.stringify(this.props.user)} - ${prevState.pendingDLRoute} - ${this.state.pendingDLRoute}`)

    if (needToDLRoute) {
      // Sentry.captureMessage(`InitialScreen.deepLinkRouter ${this.state.pendingDLRoute}`);
      this.deepLinkRouter(this.state.pendingDLRoute);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ pendingDLRoute: null });
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);

    if (this.unsubscribeFromBranch) {
      this.unsubscribeFromBranch();
      this.unsubscribeFromBranch = null;
    }
    if (this.notificationSubscription) {
      this.notificationSubscription.remove();
      this.notificationSubscription = null;
    }
  }

  backgroundState = (state: AppStateStatus) => state && state.match(/inactive|background/);

  handleAppStateChange = (nextAppState) => {
    if (
      this.props.user.isLoggedIn
      && this.backgroundState(this.state.appState)
      && (nextAppState === 'active')
    ) {
      this.sendLocation();
    }
    this.setState({ appState: nextAppState });
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus === 'granted') {
      return;
    } if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // Sentry.captureMessage('Notification status is not granted.');
      return;
    }
    const { dInitExpoNotif } = this.props;
    const token = await Notifications.getExpoPushTokenAsync();
    dInitExpoNotif(token);
  };

  listenPushNotifications = () => {
    this.notificationSubscription = Notifications.addListener((notif) => {
      // Sentry.captureMessage(`Notification received: ${JSON.stringify(notif)}`);
      const { origin, data } = notif;
      if (origin === 'selected') {
        this.deepLinkRouter(data.$deeplink_path);
      }
    });
  }

  sendLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Les évènements proposés seront moins pertinents puisqu\'ils ne seront pas géolocalisés.');
      // Sentry.captureMessage('Location status is not granted.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    this.props.dSendUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  navigateToEventDetail = (eventId: number) => {
    this.props.navigation.navigate('EventDetailsScreen', { eventId });
  }

  deepLink = (): any => Branch.subscribe(({ params, error }) => {
    // Sentry.captureMessage(`InitialScreen.deepLink ${JSON.stringify(params)}`)
    if (error) {
      Sentry.captureMessage(`Error from Branch: ${error}`);
      return;
    }

    if (params['+non_branch_link']) {
      // Route non-Branch URL if appropriate.
      return;
    }

    if (!params['+clicked_branch_link']) {
      // Indicates initialization success and some other conditions.
      // No link was opened.
      return;
    }

    // Sentry.captureMessage(`InitialScreen.deepLink setState ${params.$deeplink_path}`)
    this.setState({ pendingDLRoute: params.$deeplink_path });
  })

  deepLinkRouter = (deepLinkPath: string) => {
    const [resource, id] = deepLinkPath.split('/');
    // Sentry.captureMessage(`InitialScreen.deepLinkRouter ${deepLinkPath}`)

    switch (resource) {
      case 'event':
        this.props.navigation.navigate('EventDetailsScreen', { eventId: +id });
        break;

      default:
        Sentry.captureMessage(`Deep link ressource unknown: ${resource}`);
        break;
    }
  }

  render() {
    const { user } = this.props;

    // Sentry.captureMessage(`render: ${JSON.stringify(user)}`);

    if (user.isLoggedIn) {
      if (user.user && user.user.isFirstLogin) {
        return <Welcome />;
      }
      return <SignedInNavigator />;
    }
    return <SignedOutNavigator />;
  }
}

const mapStateToProps = ({ user }: { user: UserState}) => ({
  user,
});

const mapDispatchToProps = {
  dInitExpoNotif: initExpoNotif,
  dSendUserLocation: sendUserLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(InitialScreen));
