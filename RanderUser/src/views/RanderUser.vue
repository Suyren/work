<template lang="pug">
div(class="p-6")
  div(class="flex")
    div(:class="['rounded-tl-lg px-4 py-1 cursor-pointer hover:bg-sky-300', bookMarkClass('AllUser')]" @click="() => { changeRoute('AllUser') }") ALL 
    div(:class="['rounded-tr-lg px-4 py-1 cursor-pointer hover:bg-sky-300', bookMarkClass('MyFavorite')]" @click="() => { changeRoute('MyFavorite') }") Favorite
  div(class="bg-white shadow-lg rounded-md p-4 h-90-vh")
    router-view
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from 'vue-router'


const currentBookMark = ref('AllUser');
const vue_router = useRouter();
function bookMarkClass(bookMark: string) {
  return currentBookMark.value === bookMark ? 'bg-sky-300' : 'bg-white';
}
function changeRoute(bookMark: string) {
  currentBookMark.value = bookMark;
  vue_router.push({ name: bookMark })
}
</script>
