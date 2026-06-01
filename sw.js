const STATIC_CACHE = "boardwiki-static-v2"
const IMAGE_CACHE = "boardwiki-images-v1"
const STATIC_DESTINATIONS = new Set(["font", "script", "style"])
const MAX_IMAGE_ENTRIES = 160

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, IMAGE_CACHE].includes(key))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event

  if (request.method !== "GET") return
  if (request.mode === "navigate") return

  if (request.destination === "image") {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, MAX_IMAGE_ENTRIES))
    return
  }

  if (STATIC_DESTINATIONS.has(request.destination) && new URL(request.url).origin === self.location.origin) {
    event.respondWith(networkFirst(request, STATIC_CACHE))
  }
})

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)

  try {
    const response = await fetch(request)
    if (response && response.ok) {
      await cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await cache.match(request)
    if (cached) return cached
    throw new Error("Network request failed and no cached response is available.")
  }
}

async function cacheFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  if (cached) return cached

  const response = await fetch(request)
  if (response && (response.ok || response.type === "opaque")) {
    await cache.put(request, response.clone())
    if (maxEntries) await trimCache(cache, maxEntries)
  }

  return response
}

async function trimCache(cache, maxEntries) {
  const keys = await cache.keys()
  if (keys.length <= maxEntries) return

  await Promise.all(keys.slice(0, keys.length - maxEntries).map((key) => cache.delete(key)))
}
