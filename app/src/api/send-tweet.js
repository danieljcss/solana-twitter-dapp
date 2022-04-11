import { web3 } from '@project-serum/anchor'
import { useWorkspace } from '@/composables'
import { Tweet } from '@/models'


export const sendTweet = async (topic, content) => {
    const { wallet, program } = useWorkspace()

    // New Keypair for our new tweet account.
    const tweet = web3.Keypair.generate()

    // Send a "SendTweet" instruction
    await program.value.rpc.sendTweet(topic, content, {
        accounts: {
            author: wallet.value.publicKey,
            tweet: tweet.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [tweet]
    })

    // Fetch the newly created account from the blockchain.
    const tweetAccount = await program.value.account.tweet.fetch(tweet.publicKey)

    // Wrap the fetched account in a Tweet model so our frontend can display it.
    return new Tweet(tweet.publicKey, tweetAccount)
}
