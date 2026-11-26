import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Runs an API call and tracks { data, error, isLoading }.
 *
 *   const { data, error, isLoading, refetch } = useApi(
 *     ({ signal }) => productsApi.getProductBySlug(slug, { signal }),
 *     [slug],                      // run again when these change
 *   )
 *
 * - Cancels the old request when deps change or the component unmounts (AbortController).
 * - Keeps the previous data while the next request loads (no flicker when paging).
 * - `enabled: false` skips the call (e.g. until we know a product id).
 */
export function useApi(request, deps = [], { enabled = true } = {}) {
  const [reloadCount, setReloadCount] = useState(0)
  // `key` remembers WHICH request the stored result belongs to
  const [result, setResult] = useState({ key: null, data: null, error: null })

  // Always call the newest `request` function without restarting the effect on every render
  const requestRef = useRef(request)
  useEffect(() => {
    requestRef.current = request
  })

  // A string that changes whenever we need a new request
  const requestKey = `${JSON.stringify(deps)}#${reloadCount}`

  useEffect(() => {
    if (!enabled) return

    const controller = new AbortController()
    requestRef
      .current({ signal: controller.signal })
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((error) => {
        if (error.isCanceled) return // we canceled it ourselves, nothing to show
        setResult({ key: requestKey, data: null, error })
      })

    return () => controller.abort()
  }, [requestKey, enabled])

  // Loading = we want a result for requestKey but don't have it yet (derived, not stored)
  const isLoading = enabled && result.key !== requestKey
  const refetch = useCallback(() => setReloadCount((count) => count + 1), [])

  return { data: result.data, error: isLoading ? null : result.error, isLoading, refetch }
}
