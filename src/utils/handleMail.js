// @flow

import { Linking } from 'react-native';

export default (mail: string): void => {
  Linking.canOpenURL(`mailto: ${mail}`)
    .then((supported) => {
      if (supported) {
        Linking.openURL(`mailto: ${mail}`)
          .catch(() => null);
      }
    });
};
