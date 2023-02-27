<template lang="pug">
div(class="p-6")
  div(class="")
    span(:class="['rounded-tl-lg px-4 py-2 cursor-pointer hover:bg-sky-300', bookMarkClass('all')]") ALL 
    span(:class="['rounded-tr-lg px-4 py-2 cursor-pointer hover:bg-sky-300', bookMarkClass('favorite')]") Favorite
  div(class="bg-white shadow-lg rounded-md p-4")
    div(class="flex justify-end items-center")
      select(class="mr-8")
        option(value="10") 10
      div(class="flex")
        button(:class="['mr-6 w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('card')]")
          font-awesome-icon(icon="grip-horizontal")
        button(:class="['w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('list')]")
          font-awesome-icon(icon="list")
    ul(class="flex")
      li(v-for="peopleInfo in peopleInfoList" :key="peopleInfo.id")
        Card(:peopleInfo="peopleInfo")
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import type { Ref } from 'vue';
import type { PeopleInfo } from "@/model/components/Card";
import Card from '@/components/Card.vue';


const peopleInfoList: Ref<PeopleInfo[]> = ref([]);
const currentBookMark = ref('all');
const showMode = ref('card');
function bookMarkClass(bookMark: string) {
  return currentBookMark.value === bookMark ? 'bg-sky-300' : 'bg-white';
}
function modeClass(mode: string) {
  return showMode.value === mode ? 'bg-sky-300' : 'bg-gray-200';
}
axios.get("https://randomuser.me/api/").then((result: any) => {
  const data = result.data;
  peopleInfoList.value = data.results.map((people: any) => {
    console.log(people)
    return {
      id: people.id.value,
      headshot: people.picture.medium,
      firstName: people.name.first,
      lastName: people.name.last,
      gender: people.gender,
      email: people.email,
      phone: people.phone,
      country: people.location.country,
      city: people.location.city
    }
  })
});

</script>
