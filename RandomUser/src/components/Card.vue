<template lang="pug">
div(class="rounded-md shadow-md w-60 relative cursor-pointer" @click="() => { selectPeople(info) }")
  font-awesome-icon(icon="heart" :class="['absolute right-2 top-2 text-neutral-200 hover:text-rose-500 cursor-pointer transition-all', {'text-rose-500': isFavorite}]" @click.stop="toggleFavorite")
  div(class="bg-zinc-50 flex justify-center items-center rounded-t-md p-2 py-6")
    img(class="w-16 h-16 rounded-full" :src="info.headshot")
  div(:class="['p-2 rounded-b-md', genderStyle]")
    div(class="flex justify-between")
      span(class="font-medium") 名字
      span {{ `${info.firstName} ${info.lastName}` }}
    div(class="flex justify-between")
      span(class="font-medium") 性別
      span {{ info.gender }}
    div(class="flex justify-between")
      span(class="font-medium") 電話
      span {{ info.phone }}
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