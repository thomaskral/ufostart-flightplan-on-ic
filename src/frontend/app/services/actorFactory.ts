import { resolveAuthClient } from '@/app/services/internetIndentityClient'
import { createActor as Actor } from 'canisters/data_manager'
import { ActorConfig, HttpAgentOptions } from '@dfinity/agent'

export const createIdentifiedActor = async (
  canisterId: string,
  createActor: typeof Actor,
) => {
  const client = resolveAuthClient()
  const identity = client?.getIdentity()

  const agentOptions = {
    identity,
  } as HttpAgentOptions

  if (import.meta.env.VITE_IC_BACKEND_HOST) {
    agentOptions.host = import.meta.env.VITE_IC_BACKEND_HOST
  }

  return createActor(canisterId, { agentOptions })
}
