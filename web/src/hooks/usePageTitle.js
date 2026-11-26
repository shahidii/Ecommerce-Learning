import { useEffect } from 'react'

const SITE_NAME = 'Little Nest'

/** Sets the browser tab title: usePageTitle('Cart') → "Cart | Little Nest" */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} – Baby essentials, thoughtfully made`
  }, [title])
}
