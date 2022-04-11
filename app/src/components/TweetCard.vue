<script setup>
import { toRefs, computed } from "vue"
import { useWorkspace } from "@/composables"

const props = defineProps({
  tweet: Object,
})

const { tweet } = toRefs(props)
const { wallet } = useWorkspace()
const authorRoute = computed(() => {
  if (
    wallet.value &&
    wallet.value.publicKey.toBase58() === tweet.value.author.toBase58()
  ) {
    return { name: "Profile" }
  } else {
    return {
      name: "Users",
      params: {
        author: tweet.value.author.toBase58(),
      },
    }
  }
})

const tweetRoute = {
  name: "Tweet",
  params: { tweet: tweet.value.publicKey.toBase58() },
}

const topicRoute = {
  name: "Topics",
  params: { topic: tweet.value.topic },
}
</script>

<template>
  <div class="px-8 py-4">
    <div>
      <h3 class="inline text-neutral-300 font-semibold" :title="tweet.author">
        <!-- Link to author page or the profile page if it's our own tweet. -->
        <router-link :to="authorRoute" class="hover:underline">
          {{ tweet.author_display }}
        </router-link>
      </h3>
      <span class="text-neutral-400"> • </span>
      <time class="text-neutral-400 text-sm" :title="tweet.created_at">
        <!-- Link to the tweet page. -->
        <router-link :to="tweetRoute" class="hover:underline">
          {{ tweet.created_ago }}
        </router-link>
      </time>
    </div>
    <p class="whitespace-pre-wrap text-white" v-text="tweet.content"></p>
    <!-- TODO: Link to the topic page. -->
    <router-link
      v-if="tweet.topic"
      :to="topicRoute"
      class="inline-block mt-2 text-spink hover:underline"
    >
      #{{ tweet.topic }}
    </router-link>
  </div>
</template>
