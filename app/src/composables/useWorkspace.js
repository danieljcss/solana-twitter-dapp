import { computed } from 'vue'
import { Program, Provider } from '@project-serum/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import { useAnchorWallet } from 'solana-wallets-vue'
import idl from '../../../target/idl/solana_twitter.json'

const programID = new PublicKey(idl.metadata.address)
let workspace = null

export const useWorkspace = () => workspace

export const initWorkspace = () => {
    const wallet = useAnchorWallet()
    const connection = new Connection('http://127.0.0.1:8899')
    const provider = computed(() => new Provider(connection, wallet.value))
    const program = computed(() => new Program(idl, programID, provider.value))

    workspace = {
        wallet,
        connection,
        provider,
        program
    }
}