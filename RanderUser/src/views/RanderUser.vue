<template lang="pug">
div(class="p-6")
  div(class="mb-4 flex justify-between")
    div(class="")
      span(class="underline cursor-pointer pr-2") ALL 
      span(class="underline cursor-pointer") Favorite
    div(class="flex items-center")
      select(class="mr-2")
        option(value="10") 10
      div(class="flex")
        div(class="w-4 h-4 bg-rose-300 mr-2")
        div(class="w-4 h-4 bg-zinc-400")

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
