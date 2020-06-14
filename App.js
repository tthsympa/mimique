// @flow
/* eslint-disable global-require */

import React from 'react';
import { Provider } from 'react-redux';
// $FlowFixMe
import { PersistGate } from 'redux-persist/lib/integration/react';
import moment from 'moment';
import 'moment/locale/fr';
import Sentry from 'sentry-expo';
import { Asset, AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Root from './src/containers/views/Root';
import { store, persistor } from './src/utils/store';

moment.locale('fr');

// Sentry.enableInExpoDevelopment = true;

Sentry.config('http://621aca5727d047dfa17c9a7a2873c129@sentry.mimique.io/2').install();

Sentry.setTagsContext({
  environment: __DEV__ ? 'development' : 'production',
});

type Props = {};

type State = {
  isReady: boolean,
};

export default class App extends React.Component<Props, State> {
  state = {
    isReady: false,
  };

  imagesToCache = [
    require('./src/assets/images/fb-logo.png'),
    require('./src/assets/images/google-logo.png'),
    require('./src/assets/images/in-logo.png'),
    require('./src/assets/images/meetup-logo.png'),
    require('./src/assets/images/tmpOrganizer.png'),
    require('./src/assets/images/event-logo.png'),
    require('./src/assets/images/horizontal-mimique-logo-black.png'),
    require('./src/assets/images/square-mimique-logo.png'),
    require('./src/assets/images/splash.png'),
  ];

  fontsToCache = {
    ...Ionicons.font,
  };

  cacheResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync(this.imagesToCache),
      Font.loadAsync(this.fontsToCache),
    ]);
  }

  cacheError = (err: Error) => {
    if (__DEV__) {
      console.error(err);
    }
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => { this.setState({ isReady: true }); }}
          onError={this.cacheError}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}
