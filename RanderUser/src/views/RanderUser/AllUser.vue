<template lang="pug">
div(class="flex justify-end items-center")
  select(class="mr-8")
    option(value="10") 10
  div(class="flex")
    button(:class="['mr-6 w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('card')]")
      font-awesome-icon(icon="grip-horizontal")
    button(:class="['w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('list')]")
      font-awesome-icon(icon="list")
ul(class="flex mb-8")
  li(v-for="peopleInfo in peopleInfoList" :key="peopleInfo.id")
    Card(:peopleInfo="peopleInfo")
Pagination(:totalPage="totalPage" :currentPage="currentPage" :changePageFn="changePageFn" :numberOfRowsPerPage="numberOfRowsPerPage" :changeNumberOfRowsPerPage="changeNumberOfRowsPerPage")
</template>
  
<script setup lang="ts">
import axios from "axios";
import { computed, ref } from "vue";
import type { Ref } from 'vue';
import type { PeopleInfo } from "@/model/components/Card";
import Card from '@/components/Card.vue';
import Pagination from '@/components/Pagination.vue';


const peopleInfoList: Ref<PeopleInfo[]> = ref([]);
const showMode = ref('card');

const numberOfRowsPerPage = ref(30);
const currentPage = ref(1);
const totalPage = computed(() => {
  return 2;
})

function changePageFn(page: number) {
  currentPage.value = page;
}

function changeNumberOfRowsPerPage(page: number) {
  numberOfRowsPerPage.value = page;
  changePageFn(1);
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
  