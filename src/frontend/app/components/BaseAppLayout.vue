<template>
  <div class="relative flex w-screen flex-col md:h-screen" :class="componentName">
    <div>
      <slot name="navigation" />
    </div>
    <div class="relative flex grow flex-col">
      <slot name="content" />
    </div>
    <slot name="dialog" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export const componentName = 'BaseAppLayout'

export default defineComponent({
  name: componentName,
  setup(props) {
    return {
      componentName,
    }
  },
})
</script>
