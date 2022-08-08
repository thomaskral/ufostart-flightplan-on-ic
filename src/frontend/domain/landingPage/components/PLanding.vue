<template>
  <BaseAppLayout class="bg-primary" :class="componentName">
    <template #navigation>Navigation</template>
    <template #content>
      <button
        class="bg-accent text-base-100 hover:bg-accent-focus rounded-md px-5 py-2"
        @click="signIn"
      >
        Log in with your Internet Identity
      </button>

      <a
        :href="internetIdentityDocsUrl"
        class="text-base-100 hover:text-base-200 mt-2 text-center text-sm italic underline"
        target="_blank"
      >
        What's an Internet Identity?
      </a>
    </template>
    <template #dialog></template>
  </BaseAppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import { useUserStore } from '@/app/services/useUserStore'
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'

import { useRouter } from 'vue-router'

const internetIdentityDocsUrl =
  'https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7#:~:text=Internet%20Identity%20is%20an%20authentication,from%20the%20Internet%20Computer%20blockchain).'

export const componentName = 'PLanding'
export default defineComponent({
  name: componentName,
  components: {
    BaseAppLayout,
  },
  setup() {
    const router = useRouter()
    const { doSignIn } = useUserStore()

    return {
      componentName,
      internetIdentityDocsUrl,
      signIn: () => doSignIn(() => router.push({ name: 'Dashboard' })),
    }
  },
})
</script>
