// Safe wrappers around localStorage. Storage can throw (private mode, full disk, blocked cookies),
// so every read and write is wrapped in try/catch and the app keeps working without it.
export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore: the data just won't survive a reload.
  }
}
