// @flow

import { Constants } from 'expo';
import type { SocialConnectSource } from 'reduxTypes/user';
import facebookConnect from './facebook';
import googleConnect from './google';
import meetupConnect from './meetup';
// import eventbriteConnect from './eventbrite';

async function callSocialConnect(source: SocialConnectSource): Promise<string | null | Object> {
  switch (source) {
    case 'facebook': {
      const { type, token } = await facebookConnect();
      if (type === 'success' && token) {
        return token;
      }
      return null;
    }
    case 'google': {
      const {
        type,
        accessToken,
        idToken,
        refreshToken,
        serverAuthCode,
      } = await googleConnect();
      const standalone = Constants.appOwnership === 'standalone';
      if (standalone && type === 'success' && accessToken && idToken && refreshToken && serverAuthCode) {
        return {
          accessToken,
          idToken,
          refreshToken,
          serverAuthCode,
        };
      }
      if (type === 'success' && accessToken) {
        return accessToken;
      }
      return null;
    }
    case 'meetup': {
      const result = await meetupConnect();
      if (result.type === 'success' && result.params.access_token) {
        return result.params.access_token;
      }
      return null;
    }
    // case 'eventbrite': {
    //   const result = await eventbriteConnect();
    //   // if (result.type === 'success' && result.params.access_token) {
    //   //   return result.params.access_token;
    //   // }
    //   return null;
    // }
    default:
      return null;
  }
}

export default callSocialConnect;
