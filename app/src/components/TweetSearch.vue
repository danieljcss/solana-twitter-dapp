<script setup>
import { toRefs } from "vue"

const emit = defineEmits(["search", "update:modelValue"])
const props = defineProps({
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
})

const { modelValue, placeholder, disabled } = toRefs(props)
</script>

<template>
  <div class="relative border-b border-b-neutral-700">
    <input
      type="text"
      class="text-neutral-400 w-full pl-16 pr-32 py-4 bg-neutral-800 focus:outline-none"
      :placeholder="placeholder"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      @keydown.enter="emit('search')"
    />
    <div
      class="absolute left-0 inset-y-0 flex items-center justify-center pl-8 pr-2"
      :class="modelValue ? 'text-neutral-400' : 'text-neutral-600'"
    >
      <slot name="icon"></slot>
    </div>
    <div class="absolute right-0 inset-y-0 flex items-center pr-8">
      <button
        class="rounded-full px-4 py-1 font-semibold"
        :class="
          !disabled
            ? 'text-gray-700 bg-gray-300 hover:bg-gray-400 hover:text-white'
            : 'text-gray-400 bg-gray-200 cursor-not-allowed'
        "
        :disabled="disabled"
        @click="emit('search')"
      >
        Search
      </button>
    </div>
  </div>
</template>
