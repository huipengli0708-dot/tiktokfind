'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

export default function PostHogProvider() {
  useEffect(() => {
    posthog.init('phc_yZu6ZZyPtJYEEGKkvRVTegWsgzVLPXha7kV5of7Zvzfw', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
    })
  }, [])

  return null
}
