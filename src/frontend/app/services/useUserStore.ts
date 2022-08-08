import { defineStore } from 'pinia'
import { log } from './errorService'

import {
  init as initializeIdentity,
  signIn as signIntoIdentity,
  logOut as logOutFromIdentity,
} from '@/app/services/internetIndentityClient'
import { Identity } from '@dfinity/agent'

type UserStoreProps = {
  userName: string | null
  principal?: string
}

export const useUserStore = defineStore('userStore', {
  state: () =>
    ({
      userName: 'JD',
      principal: '',
    } as UserStoreProps),
  getters: {
    principalName(state) {
      return state.principal
    },
    isLoggedIn(state) {
      return Boolean(state.principal)
    },
    userNameInitials(state) {
      if (state.userName) {
        const parts = state.userName.split(' ')
        const initials = []

        parts.forEach((item) => {
          if (item.length > 0 && item !== '') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            initials.push(item[0])
          }
        })

        const resultingInitials = []

        resultingInitials.push(initials[0])
        if (initials.length > 1) {
          resultingInitials.push(initials[initials.length - 1])
        }

        return resultingInitials.join('').toUpperCase()
      }

      return 'JD'
    },
  },
  actions: {
    async initializeAuthentication() {
      await initializeIdentity(async (authClient) => {
        const identity = authClient.getIdentity()
        this.principal = identity.getPrincipal().toText()
      })
    },
    async doSignIn(performNavigation?: () => void) {
      await signIntoIdentity(
        async (authClient) => {
          const identity = authClient.getIdentity()
          this.principal = identity.getPrincipal().toText()
          if (performNavigation) {
            performNavigation()
          }
        },
        async (error) => {
          this.principal = undefined
          log(error)
          // @todo present error to user in a meaningful way
        },
      )
    },
    async doLogOut(performNavigation?: () => void) {
      await logOutFromIdentity(async () => {
        this.principal = undefined
      })
      if (performNavigation) {
        performNavigation()
      }
    },

    readUserNameFromLocalStorage() {
      if (window?.localStorage?.getItem('userStore')) {
        const data = window.localStorage.getItem('userStore') ?? ''
        this.userName = JSON.parse(data)?.userName ?? null
      }
    },
    updateUserName(name: string) {
      this.userName = name
      window.localStorage.setItem(
        'userStore',
        JSON.stringify({
          userName: name,
        }),
      )
    },
  },
})
