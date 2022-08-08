import { AuthClient } from '@dfinity/auth-client'
import { log } from '@/app/services/errorService'

const maxTimeToLive = BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000)

let authClient

const resolveIdentityProvider = () => {
  const internetIdentityCanister = import.meta.env.VITE_INTERNET_IDENTITY_CANISTER_ID

  // noinspection HttpUrlsUsage
  const identityProvider =
    {
      local: `http://${internetIdentityCanister}.localhost:8081`,
      staging: 'https://identity.ic0.app',
      ic: 'https://identity.ic0.app',
    }[import.meta.env.VITE_DFX_NETWORK] ?? undefined

  if (!identityProvider) {
    throw new Error('🚨 Identity provider not defined')
  }

  if (import.meta.env.DEV === true) {
    // eslint-disable-next-line no-console
    console.log('⚠️', 'identityProvider', identityProvider)
  }

  return identityProvider
}

export const resolveAuthClient = (): AuthClient | undefined => {
  return authClient
}

export const init = async (handleSignIn: (authClient: AuthClient) => void) => {
  authClient = await AuthClient.create()

  if (await authClient.isAuthenticated()) {
    handleSignIn(authClient)
  }
}

export const signIn = async (
  handleSignIn: (authClient: AuthClient) => void,
  handleFailure: (error: unknown) => void,
) => {
  await authClient.login({
    identityProvider: resolveIdentityProvider(),
    maxTimeToLive: maxTimeToLive,
    onSuccess: () => {
      handleSignIn(authClient)
    },
    onError: (err) => {
      log(err)
      handleFailure(err)
    },
  })
}

export const logOut = async (handleLogOut: () => void) => {
  await authClient.logout()
  handleLogOut()
}
