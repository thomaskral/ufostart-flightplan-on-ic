<template>
  <BaseAppLayout class="bg-base-300" :class="componentName" :can-scroll="canScroll">
    <template #navigation>Navigation</template>
    <template #content>Content</template>
    <template #dialog></template>
  </BaseAppLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'

import { useWindowSize } from '@vueuse/core'

export const componentName = 'PDashboardSection'
//  880
export default defineComponent({
  name: componentName,
  components: {
    BaseAppLayout,
  },
  setup() {
    const { height } = useWindowSize()
    return {
      componentName,
      canScroll: computed(() => height.value < 880),
    }
  },
})
</script>

<style scoped></style>
