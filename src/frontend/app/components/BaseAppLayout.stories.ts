import BaseAppLayout from '@/app/components/BaseAppLayout.vue'
import { Meta, Story } from '@storybook/vue3'

export default {
  title: 'BaseAppLayout',
  component: BaseAppLayout,
} as Meta

export const Default: Story = (args) => ({
  components: { BaseAppLayout },
  setup() {
    return { args }
  },
  template: `
    <BaseAppLayout v-bind="args" class="!w-full">
      <template #navigation>
        <div class="flex justify-center p-4 h-full w-full items-center bg-indigo-50 border-2 border-indigo-500">
          Navigation Section
        </div>
      </template>
      <template #content>
        <div class="flex justify-center h-full w-full items-center bg-green-50 border-2 border-green-500">
          Content Section
        </div>
      </template>
      <template #dialog>
        <div class="hidden absolute top-0 bottom-0 left-0 right-0 p-24 flex justify-center h-full w-full items-center">
          <div class="flex items-center justify-center bg-pink-50 border-1 border-2 border-pink-500 w-full h-full">
            Overlapping Dialog
          </div>
        </div>
      </template>
    </BaseAppLayout>`,
})

export const DialogOpen: Story = (args) => ({
  components: { BaseAppLayout },
  setup() {
    return { args }
  },
  template: `
    <BaseAppLayout v-bind="args" class="!w-full">
      <template #navigation>
        <div class="flex justify-center p-4 h-full items-center bg-indigo-50 border-2 border-indigo-500">
          Navigation Section
        </div>
      </template>
      <template #content>
        <div class="flex px-2 flex-col justify-center w-full h-full items-center bg-green-50 border-2 border-green-500">
          Content Section
        </div>
      </template>
      <template #dialog>
        <div class="absolute top-0 bottom-0 left-0 right-0 p-24 bg-white/50 backdrop-blur-[2px]">
          <div class="flex items-center justify-center bg-pink-50 border-2 border-pink-500 w-full h-full">
            Overlapping Dialog
          </div>
        </div>
      </template>
    </BaseAppLayout>`,
})
