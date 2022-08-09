<template>
  <BaseAppLayout class="bg-porcelain dark:bg-emperor" :class="componentName">
    <template #navigation></template>
    <template #content>
      <div class="py-16 sm:py-24">
        <div class="relative sm:py-16">
          <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <img
              class="mx-auto mb-8 rounded-md shadow-xl"
              src="https://uploads-ssl.webflow.com/600efa38a5bbff0b655b71f1/60111a18416e071e3d660fed_UFOstart-logo.svg"
              width="100px"
              height="100px"
            />
            <div
              class="relative overflow-hidden rounded-2xl bg-orange-500 px-6 py-10 shadow-xl sm:px-12 sm:py-20"
            >
              <div class="relative">
                <div class="sm:text-center">
                  <h2
                    class="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                  >
                    Get ready
                    <span class="whitespace-nowrap">for take off! 🚀</span>
                  </h2>
                  <p class="text-white-200 mx-auto mt-6 max-w-xl text-center text-lg">
                    Download your custom UFOstart flightplan to have a guide on your side
                    through the
                    <span class="whitespace-nowrap">marketing universe 🪐</span>
                  </p>
                </div>
                <form id="flightplan-form" class="mt-12 sm:mx-auto sm:max-w-xl">
                  <div class="w-full sm:flex">
                    <div class="min-w-0 flex-1">
                      <label for="api-key" class="sr-only">API key</label>
                      <input
                        id="api-key"
                        required
                        type="text"
                        name="api-key"
                        placeholder="Enter your key"
                        class="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm placeholder:text-center focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500 sm:placeholder:text-left"
                      />
                    </div>
                    <div class="mt-4 sm:mt-0 sm:ml-3">
                      <button
                        id="submit-button"
                        type="submit"
                        class="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-400 px-5 py-3 text-base font-medium text-white shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-500 sm:px-10"
                      >
                        <span id="submit-button-text">Login</span>
                        <span
                          id="submit-button-indicator"
                          class="invisible absolute block"
                        >
                          <span
                            style="border-top-color: transparent"
                            class="block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white dark:border-emperor"
                          ></span>
                        </span>
                      </button>
                    </div>
                  </div>
                  <span id="hint-message" class="mt-3 block text-sm">
                    Enter the key you have received by email after
                    <a
                      href="https://form.jotform.com/221392336964057"
                      class="whitespace-nowrap underline"
                      target="_blank"
                    >
                      <b>sign up</b>
                    </a>
                    to view your flightplan.
                  </span>
                  <span id="failure-message" class="mt-3 hidden text-sm">
                    🙈 Ooops, something went wrong. Please try again later or contact us
                    on
                    <a
                      href="https://discord.com/invite/ufostart"
                      target="_blank"
                      class="underline"
                    >
                      Discord
                    </a>
                    .
                  </span>
                </form>
              </div>
            </div>
            <div class="mx-auto mt-6 space-x-4 text-center text-xs text-orange-400">
              <a
                class="whitespace-nowrap"
                href="https://www.ufostart.com/legal-notes"
                target="_blank"
              >
                Legal notes
              </a>
              <a
                class="whitespace-nowrap"
                href="https://www.ufostart.com/privacy-policy"
                target="_blank"
              >
                Privacy policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #dialog></template>
  </BaseAppLayout>
</template>

<script>
import { defineComponent } from 'vue'
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'

export const componentName = 'PLanding'
export default defineComponent({
  name: componentName,
  components: {
    BaseAppLayout,
  },
  setup() {
    return {
      componentName,
    }
  },
})
</script>
