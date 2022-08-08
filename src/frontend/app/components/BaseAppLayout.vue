<template>
  <div class="relative flex w-screen flex-col md:h-screen" :class="componentName">
    <div>
      <slot name="navigation" />
    </div>
    <div class="relative flex grow flex-col" :class="[overflowClass]">
      <slot name="content" />
    </div>
    <slot name="dialog" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export const componentName = 'BaseAppLayout'

export default defineComponent({
  name: componentName,
  props: {
    canScroll: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      overflowClass: computed(() =>
        props.canScroll ? 'overflow-scroll' : 'overflow-hidden',
      ),
      componentName,
    }
  },
})
</script>
