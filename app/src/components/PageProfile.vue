<script setup>
import { ref, watchEffect } from "vue"
import { fetchTweets } from "@/api"
import TweetForm from "@/components/TweetForm"
import TweetList from "@/components/TweetList"

const tweets = ref([])
const loading = ref(true)

watchEffect(() => {
  fetchTweets()
    .then((fetchedTweets) => (tweets.value = fetchedTweets))
    .finally(() => (loading.value = false))
})

const addTweet = (tweet) => tweets.value.push(tweet)
</script>

<template>
  <!-- TODO: Check connected wallet -->
  <div
    v-if="true"
    class="border-b border-b-neutral-700 px-8 py-4 bg-neutral-800 text-white"
  >
    B1AfN7AgpMyctfFbjmvRAvE1yziZFDb9XCwydBjJwtRN
  </div>
  <tweet-form @added="addTweet"></tweet-form>
  <tweet-list :tweets="tweets" :loading="loading"></tweet-list>
</template>
