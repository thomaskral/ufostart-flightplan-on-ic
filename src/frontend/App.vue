<template>
  <RouterView :key="$route.path"></RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useUserStore } from '@/app/services/useUserStore'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
  },
  setup: () => {
    const userStore = useUserStore()
    const { doLogOut, doSignIn } = userStore

    if (import.meta.env.DEV === true && import.meta.env.VITE_DFX_AUTHENTICATION_MODE === 'true') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.doSignIn = doSignIn
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.doLogout = doLogOut
    }
  },
})
</script>
