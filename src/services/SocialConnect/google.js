// @flow

import { Google } from 'expo';
import services from 'config/services';
// import Sentry from 'sentry-expo';

export type GoogleLoginResult =
| {
    type: 'cancel',
    accessToken?: ?string,
    idToken?: ?string,
    refreshToken?: ?string,
    serverAuthCode?: ?string,
  }
| {
    type: 'success',
    accessToken?: ?string,
    idToken: ?string,
    refreshToken: ?string,
    serverAuthCode: ?string,
    user: {
      id: string,
      name: string,
      givenName: string,
      familyName: string,
      photoUrl?: ?string,
      email?: ?string,
    },
  };

export default async (): Promise<GoogleLoginResult> => {
  try {
    const googleResult = await Google.logInAsync({
      iosStandaloneAppClientId: services.googleIosStandaloneAppClientId,
      androidStandaloneAppClientId: services.googleAndroidStandaloneAppClientId,
      iosClientId: services.googleIosClientId,
      androidClientId: services.googleAndroidClientId,
      webClientId: services.googleWebClientId,

      // https://developers.google.com/identity/protocols/googlescopes#google_sign-in
      scopes: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.readonly',
      ],
    });
    // Sentry.captureMessage(`googleResult: ${JSON.stringify(googleResult)}`);
    if (googleResult.type === 'success') {
      return googleResult;
    }
    return { type: 'cancel' };
  } catch (e) {
    return { type: 'cancel' };
  }
};
