<template lang="pug">
div(class="p-6") My Favorite
</template>
  
  <script setup lang="ts">
  import axios from "axios";
  import { computed, ref } from "vue";
  import type { Ref } from 'vue';
  import type { PeopleInfo } from "@/model/components/Card";
  import Card from '@/components/Card.vue';
  import Pagination from '@/components/Pagination.vue';
  
  
  const peopleInfoList: Ref<PeopleInfo[]> = ref([]);
  const currentBookMark = ref('all');
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
  