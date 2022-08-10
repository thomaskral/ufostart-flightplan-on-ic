import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import PLanding from '@/domain/landingPage/components/PLanding.vue'
import PDashboard from '@/domain/flightplan/components/PDashboard.vue'
import PDownload from '@/domain/flightplan/components/PDownload.vue'

const isDevelopmentMode = import.meta.env.DEV

const routeLogger = (payload) => {
  if (!isDevelopmentMode) {
    return
  }
  // eslint-disable-next-line no-console
  console.log(
    '🧭',
    {
      from: payload?.from?.fullPath ?? null,
      to: payload?.to?.fullPath ?? null,
    },
    payload,
  )
}

const routeNames = {
  share_topic: 'Share Topic',
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: PLanding,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: PDashboard,
  },
  {
    path: '/flightplan-download',
    name: 'Download',
    component: PDownload,
  },
]

export { routes, routeNames }

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  routeLogger({ from, to })
})

export default router
