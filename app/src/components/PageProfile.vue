<script setup>
import { ref, watchEffect } from "vue"
import { fetchTweets } from "@/api"
import TweetForm from "@/components/TweetForm"
import TweetList from "@/components/TweetList"
import { useWorkspace } from "@/composables"

const tweets = ref([])
const loading = ref(true)
const { wallet } = useWorkspace()

watchEffect(() => {
  fetchTweets()
    .then((fetchedTweets) => (tweets.value = fetchedTweets))
    .finally(() => (loading.value = false))
})

const addTweet = (tweet) => tweets.value.push(tweet)
</script>

<template>
  <!-- Check connected wallet -->
  <div
    v-if="wallet"
    class="border-b border-b-neutral-700 px-8 py-4 bg-neutral-800 text-white"
  >
    {{ wallet.publicKey.toBase58() }}
  </div>
  <tweet-form @added="addTweet"></tweet-form>
  <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
