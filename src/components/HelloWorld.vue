<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template lang="pug">
h1( 
  class="bg-gradient-to-r from-green-600 to-sky-400 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent" 
) {{ msg }}

p( class="mt-6 space-x-4" ) Recommended IDE setup:
  a( 
    class="text-emerald-500 underline transition-all hover:text-emerald-400" 
    href="https://code.visualstudio.com/"
  ) VSCODE 
  | + 
  a(
    href="https://github.com/johnsoncodehk/volar"
    class="text-emerald-500 underline transition-all hover:text-emerald-400"
    target="_blank"
  ) Volar

p( class="mt-4 space-x-4" )
  a( 
    class="text-emerald-500 underline transition-all hover:text-emerald-400" 
    href="https://vitejs.dev/guide/features.html"
    target="_blank"
  ) Vite Documentation 
  | |
  a(
    href="https://v3.vuejs.org/"
    class="text-emerald-500 underline transition-all hover:text-emerald-400"
    target="_blank"
  ) Vue 3 Documentation

button(
  type="button"
  class="my-6 rounded bg-gray-300 px-4 py-2 transition-all hover:bg-gray-200"
  @click="count++"
) count is: {{ count }}
p 
  | Edit
  |
  <code class="text-gray-400">components/HelloWorld.vue</code>
  |
  | to test hot module replacement.
</template>

<style scoped></style>
