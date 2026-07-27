export function faviconUrl(url) {
  try {
    return 'https://www.google.com/s2/favicons?sz=64&domain=' + new URL(url).hostname
  } catch {
    return null
  }
}

export function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
