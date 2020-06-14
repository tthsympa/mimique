// @flow

import { Facebook } from 'expo';
import services from 'config/services';

export type FacebookLoginResult = {
  type: string,
  token?: string,
  expires?: number,
};

export default async (): Promise<FacebookLoginResult> => {
  try {
    const config = {
      // https://developers.facebook.com/docs/facebook-login/permissions/
      permissions: [
        'public_profile',
        'email',
        // 'user_friends',
        // 'user_events',
        // 'user_likes',
        'user_location',
      ],
      behavior: 'web',
    };
    const facebookResult = await Facebook.logInWithReadPermissionsAsync(
      services.facebookAppKey,
      config,
    );
    return facebookResult;
  } catch (error) {
    return { type: 'error' };
  }
};
