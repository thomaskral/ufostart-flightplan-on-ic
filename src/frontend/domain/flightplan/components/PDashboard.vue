<template>
  <BaseAppLayout class="bg-base-300" :class="componentName">
    <template #navigation></template>
    <template #content>
      <div class="p-10">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="min-w-0 flex-1">
            <span>Hello Firstname Secondname</span>
            <h2
              class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
            >
              Company Name Flightplan
            </h2>
            <div class="mt-1 flex flex-row flex-wrap space-x-6 sm:mt-0">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <StarIcon
                  class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Goal
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <LocationMarkerIcon
                  class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                Phase
              </div>
            </div>
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
        <div class="mt-12 rounded-md bg-porcelain p-6">
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
                    class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600"
                  >
                    <span class="text-indigo-600">{{ step.id }}</span>
                  </span>
                  <span class="ml-4 text-sm font-medium text-indigo-600">
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
          <div class="mt-6">
            <div class="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="position in positions" :key="position.id">
                  <a href="#" class="block hover:bg-gray-50">
                    <div class="px-4 py-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <p class="truncate text-sm font-medium text-indigo-600">
                          {{ position.title }}
                        </p>
                        <div class="ml-2 flex flex-shrink-0">
                          <p
                            class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                          >
                            {{ position.type }}
                          </p>
                        </div>
                      </div>
                      <div class="mt-2">
                        <p>Longer Description</p>
                        <div class="relative mt-1 flex items-start">
                          <div class="flex h-5 items-center">
                            <input
                              id="comments"
                              aria-describedby="comments-description"
                              name="comments"
                              type="checkbox"
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="comments" class="font-medium text-gray-700">
                              New comments&nbsp;
                            </label>
                            <span id="comments-description" class="text-gray-500">
                              <span class="sr-only">New comments</span>
                              so you always know what's happening.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="mt-2 sm:flex sm:justify-between">
                        <div class="sm:flex">
                          <p class="flex items-center text-sm text-gray-500">
                            <UsersIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            {{ position.department }}
                          </p>
                          <p
                            class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                          >
                            <LocationMarkerIcon
                              class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            {{ position.location }}
                          </p>
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon
                            class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Completed on
                            {{ ' ' }}
                            <time :datetime="position.closeDate">
                              {{ position.closeDateFull }}
                            </time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
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
import {
  StarIcon,
  CheckIcon,
  LocationMarkerIcon,
  PencilIcon,
  CalendarIcon,
  UsersIcon,
} from '@heroicons/vue/solid'

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
    closeDate: '2020-01-07',
    closeDateFull: 'January 7, 2020',
  },
  {
    id: 2,
    title: 'Some Marketing Action',
    type: 'To Do',
    location: 'Priority',
    department: 'Effort',
    closeDate: '',
    closeDateFull: '',
  },
  {
    id: 3,
    title: 'Some Marketing Action',
    type: 'To Do',
    location: 'Priority',
    department: 'Effort',
    closeDate: '',
    closeDateFull: '',
  },
]
</script>
