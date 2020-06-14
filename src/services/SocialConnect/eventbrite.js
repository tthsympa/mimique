// @flow

import { AuthSession, Constants } from 'expo';
import services from 'config/services';

// Eventbrite permet pas de rediriger vers expo ou un truc du genre... y'en a marre
export default async () => {
  try {
    const config = {
      url: `https://www.eventbrite.com/oauth/authorize?client_id=${services.eventbriteConsumerKey}`,
    };
    return await AuthSession.startAsync({
      authUrl: `${config.url}&response_type=token&redirect_uri=${encodeURIComponent('https://example.com/')}`,
      returnUrl: `${Constants.linkingUrl}expo-auth-session`,
    });
  } catch (error) {
    return { type: 'error' };
  }
};
