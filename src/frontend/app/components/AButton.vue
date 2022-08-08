<template>
  <component
    :is="computedTag"
    v-if="!isUnstyled"
    class="rounded-angularness bg-primary text-primary-content hover:bg-primary-focus focus:ring-primary-focus inline-flex items-center justify-center border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
    :class="[...computedSizeCss, ...computedDisabledCss, $options.name]"
    :disabled="isDisabled"
    v-bind="computedAttributes"
    @click.stop="handleClick($event)"
  >
    <slot />
  </component>
  <component
    :is="computedTag"
    v-else
    :class="[$options.name]"
    :disabled="isDisabled"
    v-bind="computedAttributes"
    @click.stop="handleClick"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ALink from './ALink.vue'
import get from 'lodash/get'

const buttonSizes = {
  DEFAULT: ['px-4', 'py-2', 'text-sm'],
  xs: ['px-2.5', 'py-1.5', 'text-xs'],
  sm: ['px-3', 'py-2', 'text-sm', 'leading-4'],
  base: ['px-4', 'py-2', 'text-sm'],
  lg: ['px-4', 'py-2', 'text-base'],
  xl: ['px-6', 'py-3', 'text-base'],
}

interface ComponentDataProps {
  id?: string | null
  url?: string | null
  path?: string | null
}

export default defineComponent({
  name: 'AButton',
  components: {
    ALink,
  },
  props: {
    componentData: {
      type: Object as PropType<ComponentDataProps>,
      default: () => ({
        id: null,
        url: null,
        path: null,
      }),
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isUnstyled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'base',
    },
  },
  emits: {
    'a-button-clicked': (payload: { componentName: string; event: Event }) => payload,
  },
  computed: {
    computedTag() {
      if (this.componentData.url || this.componentData.path) {
        return 'ALink'
      }
      return 'button'
    },
    computedAttributes() {
      if (this.componentData.path || this.componentData.url) {
        return {
          componentData: this.componentData,
          isDisabled: this.isDisabled,
          isUnstyled: true,
        }
      }
      return {}
    },
    computedSizeCss() {
      return get(buttonSizes, this.size, buttonSizes.DEFAULT)
    },
    computedDisabledCss() {
      return this.isDisabled ? ['bg-primary-disabled', 'pointer-events-none'] : []
    },
  },
  methods: {
    handleClick(event: Event) {
      this.$emit('a-button-clicked', {
        componentName: this.$options.name as string,
        event: event,
      })
    },
  },
})
</script>

<style scoped></style>
