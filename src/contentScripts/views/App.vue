<script setup lang="ts">
//import { sendMessage, onMessage } from 'webext-bridge/options';
import 'uno.css'

const time = ref()

</script>

<template>
  <h1>Вы уверены, что хотите посетить этот сайт?</h1>
  <a><div>Перейти на сайт</div></a>
  <h3>Расширение автоматически отключится</h3>
  <h3>За эту сессию вы работали {{ time }}</h3>

  <!-- <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg">
        Vitesse WebExt
      </h1>
      <SharedSubtitle />
    </div>
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div> -->
</template>
