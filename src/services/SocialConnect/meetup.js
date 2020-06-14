// @flow

import { AuthSession, Constants } from 'expo';
import services from 'config/services';

// Pour un test en local... l'accesstoken du 1h
export default async () => {
  try {
    const config = {
      url: `https://secure.meetup.com/oauth2/authorize?client_id=${services.meetupConsumerKey}`,
    };
    return await AuthSession.startAsync({
      authUrl: `${config.url}&redirect_uri=${encodeURIComponent('exp://localhost:19000/+expo-auth-session')}&response_type=token&set_mobile=on&suppress=reg`,
      returnUrl: `${Constants.linkingUrl}expo-auth-session`,
    });
  } catch (error) {
    return { type: 'error' };
  }
};
