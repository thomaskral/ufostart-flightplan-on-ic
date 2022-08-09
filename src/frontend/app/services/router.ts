import { useUserStore } from '@/app/services/useUserStore'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import PLanding from '@/domain/landingPage/components/PLanding.vue'
import PDashboard from '@/domain/dashboard/components/PDashboard.vue'

const isDevelopmentMode = import.meta.env.DEV
const isAuthenticationMode = import.meta.env.VITE_DFX_AUTHENTICATION_MODE

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
]

export { routes, routeNames }

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  if(isAuthenticationMode === 'true'){
    console.log(isAuthenticationMode)
    const userStore = useUserStore()
    const { initializeAuthentication } = userStore
    await initializeAuthentication()

    if (!userStore.isLoggedIn && to.name !== 'Home' && to.name !== '') {
      routeLogger({ msg: 'redirect to home', nav: { from, to } })
      return { name: 'Home' }
    }

    if (userStore.isLoggedIn && to.name === 'Home') {
      return { name: 'Dashboard' }
    }
  }

  routeLogger({ from, to })
})

export default router