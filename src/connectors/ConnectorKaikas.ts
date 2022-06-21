import { Connector } from '../types'
import { ConnectionRejectedError } from '../errors'
import { AbstractConnector } from '@web3-react/abstract-connector'

export default async function init(): Promise<Connector> {
  const { KaikasConnector, UserRejectedRequestError } = await import(
    'kaikas-connector'
  )
  return {
    web3ReactConnector({ chainId }: { chainId: number[] }) {
      return new KaikasConnector({
        supportedChainIds: chainId,
      }) as unknown as AbstractConnector
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError
        ? new ConnectionRejectedError()
        : null
    },
  }
}
