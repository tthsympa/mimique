// @flow
import type { Event } from 'reduxTypes/events'

const createEventDeepLink = async (event: Event): Promise<any> => {
  const payload = {
    branch_key: '<KEY>',
    feature: 'share_event',
    data: {
      $canonical_identifier: `event/${event.id}`,
      $canonical_url: `<URL>`,
      $deeplink_path: `event/${event.id}`,
      $og_title: event.title,
      $og_description: event.description,
      $og_image_url: event.imageUrl,
      $twitter_title: event.title,
      $twitter_description: event.description,
      $marketing_title: event.title,
      '~marketing': true,
    },
  }

  try {
    const response = await fetch('https://api2.branch.io/v1/url', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const { url } = await response.json()
    return url
  } catch (err) {
    console.error(err)
  }
  return null
}

export { createEventDeepLink }
