<template>
  <BaseAppLayout class="bg-base-300" :class="componentName">
    <template #navigation></template>
    <template #content>
      <div class="flex h-screen flex-col p-10">
        <div class="flex justify-between">
          <div class="min-w-0 flex-1">
            <span>Hello Vitalik Buterin</span>
            <h2
              class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
            >
              Ethereum Flightplan
            </h2>
            <div class="mt-1 flex flex-row flex-wrap space-x-6 sm:mt-0">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <StarIcon
                  class="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400"
                  aria-hidden="true"
                />
                Community engagement (Goal)
              </div>
            </div>
          </div>
          <div>
            <img
              class="mx-auto mb-8 h-[24px] w-[24px] rounded-md shadow-xl md:h-[48px] md:w-[48px]"
              src="https://uploads-ssl.webflow.com/600efa38a5bbff0b655b71f1/60111a18416e071e3d660fed_UFOstart-logo.svg"
              width="100px"
              height="100px"
            />
          </div>
          <div v-if="false" class="mt-5 flex lg:mt-0 lg:ml-4">
            <span class="block">
              <button
                type="button"
                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <PencilIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                Edit
              </button>
            </span>
          </div>
        </div>
        <div class="mt-12 flex grow flex-col overflow-hidden rounded-md bg-porcelain p-6">
          <nav aria-label="Progress">
            <ol
              role="list"
              class="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
            >
              <li
                v-for="(step, stepIdx) in steps"
                :key="step.name"
                class="relative md:flex md:flex-1"
              >
                <a
                  v-if="step.status === 'complete'"
                  :href="step.href"
                  class="group flex w-full items-center"
                >
                  <span class="flex items-center px-6 py-4 text-sm font-medium">
                    <span
                      class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800"
                    >
                      <CheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                    <span class="ml-4 text-sm font-medium text-gray-900">
                      {{ step.name }}
                    </span>
                  </span>
                </a>
                <a
                  v-else-if="step.status === 'current'"
                  :href="step.href"
                  class="flex items-center px-6 py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-orange-500"
                  >
                    <span class="text-orange-500">{{ step.id }}</span>
                  </span>
                  <span class="ml-4 text-sm font-medium text-orange-500">
                    {{ step.name }}
                  </span>
                </a>
                <a v-else :href="step.href" class="group flex items-center">
                  <span class="flex items-center px-6 py-4 text-sm font-medium">
                    <span
                      class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400"
                    >
                      <span class="text-gray-500 group-hover:text-gray-900">
                        {{ step.id }}
                      </span>
                    </span>
                    <span
                      class="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900"
                    >
                      {{ step.name }}
                    </span>
                  </span>
                </a>
                <template v-if="stepIdx !== steps.length - 1">
                  <!-- Arrow separator for lg screens and up -->
                  <div
                    class="absolute top-0 right-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      class="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vector-effect="non-scaling-stroke"
                        stroke="currentcolor"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </template>
              </li>
            </ol>
          </nav>
          <div class="mt-6 overflow-hidden">
            <div class="h-full overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" class="h-full divide-y divide-gray-200 overflow-y-scroll">
                <li v-for="position in positions" :key="position.id">
                  <div class="block">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <div class="mt-1">
                          <p class="font-medium text-gray-700">
                            Make your discord channels public
                          </p>
                        </div>
                        <div class="ml-2 flex flex-shrink-0">
                          <p
                            class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                            :class="computedStatusCss(position.type)"
                          >
                            {{ position.type }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-3 text-sm">
                        <p>Marketing action description</p>
                      </div>
                      <div class="mt-3 sm:flex sm:justify-between">
                        <div class="sm:flex">
                          <p class="flex items-end text-sm text-gray-500">
                            <span
                              class="mr-1.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-400 text-center text-white"
                              aria-hidden="true"
                            >
                              5
                            </span>
                            {{ position.department }}
                          </p>
                          <p
                            class="mt-2 flex items-end text-sm text-gray-500 sm:mt-0 sm:ml-6"
                          >
                            <span
                              class="mr-1.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-400 text-center text-white"
                              aria-hidden="true"
                            >
                              3
                            </span>
                            {{ position.location }}
                          </p>
                        </div>
                        <div class="block">
                          <div
                            class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                            :class="
                              position.startedDateFull === '' ? 'invisible' : 'visible'
                            "
                          >
                            <CalendarIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Started
                              {{ ' ' }}
                              <time :datetime="position.closeDate">
                                {{ position.startedDateFull }}
                              </time>
                            </p>
                          </div>
                          <div
                            class="mt-1 flex items-center text-sm text-gray-500"
                            :class="
                              position.closeDateFull === '' ? 'invisible' : 'visible'
                            "
                          >
                            <CalendarIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <p>
                              Completed
                              {{ ' ' }}
                              <time :datetime="position.closeDate">
                                {{ position.closeDateFull }}
                              </time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #dialog></template>
  </BaseAppLayout>
</template>

<script lang="ts" setup>
import BaseAppLayout from '@/app/components/BaseAppLayout.vue'
import { StarIcon, CheckIcon, PencilIcon, CalendarIcon } from '@heroicons/vue/solid'

const componentName = 'PDashboard'

const steps = [
  { id: '01', name: 'Start', href: '#', status: 'current' },
  { id: '02', name: 'Growth/Scale', href: '#', status: 'upcoming' },
  { id: '03', name: 'Professionalize', href: '#', status: 'upcoming' },
]

const positions = [
  {
    id: 1,
    title: 'Some Marketing Action',
    type: 'Done',
    location: 'Priority',
    department: 'Effort',
    startedDate: '2020-01-07',
    startedDateFull: 'January 7, 2020',
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'Some Marketing Action',
    type: 'In progress',
    location: 'Priority',
    department: 'Effort',
    startedDate: '2020-01-07',
    startedDateFull: 'January 7, 2020',
    closeDate: '',
    closeDateFull: '',
  },
  {
    id: 3,
    title: 'Some Marketing Action',
    type: 'To do',
    location: 'Priority',
    department: 'Effort',
    startedDate: '2020-01-07',
    startedDateFull: '',
    closeDate: '',
    closeDateFull: '',
  },
  {
    id: 4,
    title: 'Some Marketing Action',
    type: 'To do',
    location: 'Priority',
    department: 'Effort',
    startedDate: '2020-01-07',
    startedDateFull: '',
    closeDate: '',
    closeDateFull: '',
  },
  {
    id: 5,
    title: 'Some Marketing Action',
    type: 'To do',
    location: 'Priority',
    department: 'Effort',
    startedDate: '2020-01-07',
    startedDateFull: '',
    closeDate: '',
    closeDateFull: '',
  },
  {
    id: 6,
    title: 'Some Marketing Action',
    type: 'To do',
    location: 'Priority',
    department: 'Effort',
    startedDate: '2020-01-07',
    startedDateFull: '',
    closeDate: '',
    closeDateFull: '',
  },
  {
    id: 7,
    title: 'Some Marketing Action',
    type: 'To do',
    location: 'Priority',
    department: 'Effort',
    startedDate: '2020-01-07',
    startedDateFull: '',
    closeDate: '',
    closeDateFull: '',
  },
]

const computedStatusCss = (status) => {
  if (status === 'Done') {
    return 'bg-green-100 text-green-800'
  }

  if (status === 'In progress') {
    return 'bg-yellow-100 text-yellow-800'
  }

  if (status === 'To do') {
    return 'bg-red-100 text-red-800'
  }
}
</script>
