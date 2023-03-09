<template lang="pug">
div(class="p-6")
  div(class="flex")
    div(:class="['rounded-tl-lg px-4 py-1 cursor-pointer hover:bg-white', bookMarkClass('AllUser')]" @click="() => { changeRoute('AllUser') }") 所有用戶 
    div(:class="['rounded-tr-lg px-4 py-1 cursor-pointer hover:bg-white', bookMarkClass('MyFavorite')]" @click="() => { changeRoute('MyFavorite') }") 我的收藏
  div(class="bg-white shadow-lg rounded-md p-4 h-90-vh")
    router-view
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from 'vue-router'

const vue_route = useRoute();
const vue_router = useRouter();
const currentBookMark = ref(vue_route.name);
function bookMarkClass(bookMark: string) {
  return currentBookMark.value === bookMark ? 'bg-white' : 'bg-slate-200';
}
function changeRoute(bookMark: string) {
  currentBookMark.value = bookMark;
  localStorage.setItem('currentPage', "1");
  vue_router.push({ name: bookMark })
}
</script>
