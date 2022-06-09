import {precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL} from 'workbox-precaching'
import {clientsClaim} from "workbox-core";
import {registerRoute, NavigationRoute} from "workbox-routing";

declare let self: ServiceWorkerGlobalScope

self.skipWaiting()
clientsClaim()

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html'), {denylist: [/api\/*/g]}))
