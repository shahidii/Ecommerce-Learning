// A JWT has three parts: header.payload.signature (base64url encoded).
// We only READ the payload to know when the token expires. We never trust it for security:
// the API checks the signature on every request.
export function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

/** true when the token is broken or expires within the next `marginSeconds`. */
export function isTokenExpired(token, marginSeconds = 30) {
  const payload = decodeToken(token)
  if (!payload?.exp) return true
  return payload.exp * 1000 < Date.now() + marginSeconds * 1000
}
