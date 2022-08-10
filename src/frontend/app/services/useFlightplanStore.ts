import { defineStore } from 'pinia'
import { log } from './errorService'
import { getFlightPlanByApiKey } from 'ufostart-flightplan-api-client'

type flightplanProps = {
  apiKey: string | null
  flightplan: Array<object>
  phases: Array<string>
  isFetching: boolean
  showError: boolean
}

export const useFlightplanStore = defineStore('flightplanStore', {
  state: () =>
    ({
      apiKey: null,
      flightplan: [],
      phases: ['START', 'GROWTH/SCALE', 'PROFESSIONALIZE'],
      isFetching: false,
      showError: false,
    } as flightplanProps),
  actions: {
    async getFlightplan() {
      this.isFetching = true
      this.showError = false
      this.flightplan = []

      try {
        const rawFlightplan =
          (await getFlightPlanByApiKey(this.apiKey))?.records?.phase ?? null

        if (rawFlightplan === null) {
          log('🚨 No flightplan available')
          return
        }

        this.phases.forEach((phase) => {
          rawFlightplan[phase]?.topics.forEach((topic) => {
            topic.actions.forEach((action) => {
              this.flightplan.push({
                phase: action.phase,
                action: action.name,
                description: action.description,
                prority: action.priority,
                effort: action.effort,
              })
            })
          })
        })
      } catch (e) {
        this.showError = true
        log(e)
      }

      this.isFetching = false
    },
  },
})
