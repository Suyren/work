<template lang="pug">
div(:class="['rounded-md shadow-md w-full flex justify-between items-center cursor-pointer', genderStyle]" @click="() => { selectPeople(info) }")
  div(class="flex items-center")
    div(class=" flex justify-center items-center rounded-t-md p-2 py-6")
      img(class="w-16 h-16 rounded-full" :src="info.headshot")
    div(:class="['p-2 rounded-b-md']")
      div(class="flex")
        span(class="font-medium pr-2") 名字:
        span {{ `${info.firstName} ${info.lastName}` }}
      div(class="flex")
        span(class="font-medium pr-2") 性別:
        span {{ info.gender }}
      div(class="flex")
        span(class="font-medium pr-2") 電話:
        span {{ info.phone }}
  font-awesome-icon(icon="heart" :class="['text-neutral-200 hover:text-rose-500 cursor-pointer transition-all mr-8 text-3xl', {'text-rose-500': isFavorite}]" @click.stop="toggleFavorite")
  </template>
  
  <script setup lang="ts">
  import type { PeopleInfo } from '@/model/components/Card';
  import { computed, ref } from 'vue';
  import { useUserStore } from "@/store";
  
  const userStore = useUserStore();
  const props = defineProps<{
    peopleInfo: PeopleInfo,
    selectPeople: (people: PeopleInfo) => void
  }>()
  
  const info = ref(props.peopleInfo);
  const genderStyle = computed(() => info.value.gender === 'male' ? 'bg-blue-200' : 'bg-rose-200');
  
  const isFavorite = computed(() => userStore.favoriteUserList.some((favoriteUser: PeopleInfo) => favoriteUser.id === props.peopleInfo.id));
  
  function toggleFavorite() {
    const index = userStore.favoriteUserList.findIndex((favoriteUser: PeopleInfo) => favoriteUser.id === props.peopleInfo.id);
    if (index === -1) {
      userStore.$patch(state => {
        state.favoriteUserList.push(props.peopleInfo);
        localStorage.setItem('favoriteUserList', JSON.stringify(state.favoriteUserList));
      })
    } else {
      userStore.$patch(state => {
        state.favoriteUserList.splice(index, 1);
        localStorage.setItem('favoriteUserList', JSON.stringify(state.favoriteUserList));
      })
    }
  }
  </script>