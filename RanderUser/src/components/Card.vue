<template lang="pug">
div(class="rounded-md shadow-md w-60")
  div(class="bg-zinc-50 flex justify-center items-center rounded-t-md p-2 py-6")
    img(class="w-16 h-16 rounded-full" :src="info.headshot")
  div(:class="['p-2 rounded-b-md', genderStyle]")
    div(class="flex justify-between")
      span(class="font-medium") Name
      span {{ `${info.firstName} ${info.lastName}` }}
    div(class="flex justify-between")
      span(class="font-medium") Gender
      span {{ info.gender }}
    div(class="flex justify-between")
      span(class="font-medium") Phone
      span {{ info.phone }}
</template>

<script setup lang="ts">
import type { PeopleInfo } from '@/model/components/Card';
import { computed, ref } from 'vue';

const props = defineProps<{
  peopleInfo: PeopleInfo
}>()

const info = ref(props.peopleInfo);
const genderStyle = computed(() => info.value.gender === 'male' ? 'bg-blue-300' : 'bg-rose-300')

</script>