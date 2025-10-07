/**
 * Wedding Card Service Worker
 * Scoped specifically to /wedding-card/ to avoid conflicts with main site
 * Provides offline caching and background sync capabilities
 */

const CACHE_NAME = "wedding-card-v1";
const OFFLINE_URL = "/wedding-card/offline";
const WEDDING_CARD_SCOPE = "/wedding-card/";

// Assets to cache for offline use (all scoped to wedding-card)
const urlsToCache = [
  "/wedding-card",
  "/wedding-card/",
  "/wedding-card/offline",
  "/wedding-card/assets/music.ogg",
  "/wedding-card/assets/bank-qr-code.jpg",
  "/wedding-card/assets/wedding-invitation.png",
  "/wedding-card/assets/shopee-1.webp",
  "/wedding-card/assets/shopee-2.webp",
  "/wedding-card/assets/shopee-3.webp",
  "/wedding-card/assets/shopee-4.webp",
  "/wedding-card/assets/shopee-5.webp",
  "/wedding-card/assets/shopee-6.webp",
  // Add other critical assets
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log(
    "💍 Wedding Card Service Worker installing (scoped to /wedding-card/)"
  );

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Caching wedding card assets");
        return cache.addAll(
          urlsToCache.map(
            (url) => new Request(url, { credentials: "same-origin" })
          )
        );
      })
      .then(() => {
        console.log("✅ Wedding card assets cached successfully");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("❌ Caching failed:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log(
    "🎉 Wedding Card Service Worker activated (scoped to /wedding-card/)"
  );

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("🗑️ Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Only handle requests that are within our wedding-card scope
  // This prevents interference with the main site's service worker
  if (!url.pathname.startsWith(WEDDING_CARD_SCOPE)) {
    return; // Let the main site's service worker handle this
  }

  // Handle wedding card pages
  if (url.pathname.startsWith("/wedding-card")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return cached version if available
        if (response) {
          console.log(
            "📱 Wedding Card: Serving from cache:",
            event.request.url
          );
          return response;
        }

        // Otherwise, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response;
            }

            // Clone the response to cache it
            const responseToCache = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // Network failed, serve offline page for navigation requests
            if (event.request.mode === "navigate") {
              return caches.match(OFFLINE_URL);
            }

            // For other requests, return a fallback if available
            return caches.match("/wedding-card/");
          });
      })
    );
  }

  // Handle wedding-card asset requests (scoped to /wedding-card/assets/)
  else if (url.pathname.startsWith("/wedding-card/assets/")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((response) => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
        );
      })
    );
  }
});

// Background Sync for offline data
self.addEventListener("sync", (event) => {
  console.log("🔄 Background sync triggered:", event.tag);

  if (event.tag === "rsvp-sync") {
    event.waitUntil(syncRSVPs());
  } else if (event.tag === "guestbook-sync") {
    event.waitUntil(syncGuestbookMessages());
  }
});

// Sync offline RSVPs
async function syncRSVPs() {
  try {
    console.log("📤 Syncing offline RSVPs...");

    // Get offline data from IndexedDB or localStorage
    const offlineData = await getOfflineData();
    const pendingRSVPs = offlineData.rsvps.filter(
      (rsvp) => rsvp.status === "queued"
    );

    for (const rsvp of pendingRSVPs) {
      try {
        // Send to your API endpoint
        const response = await fetch("/api/rsvp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rsvp),
        });

        if (response.ok) {
          // Mark as synced
          rsvp.status = "synced";
          console.log("✅ RSVP synced:", rsvp.id);
        } else {
          console.error("❌ RSVP sync failed:", response.status);
        }
      } catch (error) {
        console.error("❌ RSVP sync error:", error);
      }
    }

    // Update offline data
    await updateOfflineData(offlineData);
  } catch (error) {
    console.error("❌ RSVP sync process failed:", error);
  }
}

// Sync offline guestbook messages
async function syncGuestbookMessages() {
  try {
    console.log("📤 Syncing offline messages...");

    const offlineData = await getOfflineData();
    const pendingMessages = offlineData.messages.filter(
      (msg) => msg.status === "queued"
    );

    for (const message of pendingMessages) {
      try {
        const response = await fetch("/api/guestbook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });

        if (response.ok) {
          message.status = "synced";
          console.log("✅ Message synced:", message.id);
        }
      } catch (error) {
        console.error("❌ Message sync error:", error);
      }
    }

    await updateOfflineData(offlineData);
  } catch (error) {
    console.error("❌ Message sync process failed:", error);
  }
}

// Helper functions for offline data management
async function getOfflineData() {
  // In a real implementation, you'd use IndexedDB
  // For now, return empty structure
  return {
    rsvps: [],
    messages: [],
    lastSync: Date.now(),
  };
}

async function updateOfflineData(data) {
  // Save updated data back to storage
  console.log("💾 Updating offline data");
}

// Push notification support
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "New wedding update!",
    icon: "/icon.png",
    badge: "/badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    actions: [
      {
        action: "view",
        title: "View Update",
        icon: "/view-icon.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/close-icon.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("💍 Wedding Update", options)
  );
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("🔔 Notification clicked:", event.action);

  event.notification.close();

  if (event.action === "view") {
    event.waitUntil(clients.openWindow("/wedding-card"));
  }
});
