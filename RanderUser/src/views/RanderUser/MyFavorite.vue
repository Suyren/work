<template lang="pug">
div(class="flex justify-end items-center mb-4")
  div(class="flex")
    button(:class="['mr-6 w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('card')]" @click="() => { changeMode('card') }")
      font-awesome-icon(icon="grip-horizontal")
    button(:class="['w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('list')]" @click="() => { changeMode('list') }")
      font-awesome-icon(icon="list")
ul(class="mb-8 h-[calc(100%_-_8rem)] overflow-auto")
  li(v-for="peopleInfo in peopleInfoList[currentPage - 1]" :key="peopleInfo.id" class="inline-block mx-4 mb-4 self-start h-52")
    Card(:peopleInfo="peopleInfo")
Pagination(:totalPage="totalPage" :currentPage="currentPage" :changePageFn="changePageFn" :numberOfRowsPerPage="numberOfRowsPerPage" :changeNumberOfRowsPerPage="changeNumberOfRowsPerPage")
Modal(v-if="isShowModal" :closeFn="closeFn")
</template>
  
<script setup lang="ts">
import { computed, ref } from "vue";
import type { Ref } from 'vue';
import type { PeopleInfo } from "@/model/components/Card";
import Card from '@/components/Card.vue';
import Pagination from '@/components/Pagination.vue';
import Modal from '@/components/Modal.vue';
import { useUserStore } from "@/store";

const userStore = useUserStore();

const showMode = ref(localStorage.getItem('showMode') ? localStorage.getItem('showMode') : 'card');
const isShowModal = ref(false);
const numberOfRowsPerPage = ref(localStorage.getItem('perPage') ? Number(localStorage.getItem('perPage')) : 30);
const currentPage = ref(localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1);
const totalPage = computed(() => {
  const totalData = userStore.favoriteUserList.length;
  const total = totalData < numberOfRowsPerPage.value
    ? 1
    : Math.ceil(totalData / numberOfRowsPerPage.value);
  if (currentPage.value > total) {
    currentPage.value = 1;
  }
  return total;
})

const peopleInfoList = computed(() => {
  const allData: PeopleInfo[][] = [];
  let data: PeopleInfo[] = [];
  const isCompletePage = userStore.favoriteUserList.length % numberOfRowsPerPage.value === 0 ? true : false;
  userStore.favoriteUserList.forEach((favoriteUser: PeopleInfo, index: number) => {
    data.push(favoriteUser);
    if (data.length === numberOfRowsPerPage.value) {
      allData.push(data);
      data = [];
    }
    if (!isCompletePage && index === userStore.favoriteUserList.length - 1) {
      allData.push(data);
    }
  })
  return allData;
});

function addFavorite() {

}

function changeMode(mode: string) {
  showMode.value = mode;
  localStorage.setItem('showMode', mode);
}

function toggleModal(status: boolean) {
  isShowModal.value = status;
}

function closeFn() {
  toggleModal(false);
}

function changePageFn(page: number) {
  currentPage.value = page;
  localStorage.setItem('currentPage', String(page));
}

function changeNumberOfRowsPerPage(perPage: number) {
  numberOfRowsPerPage.value = perPage;
  localStorage.setItem('perPage', String(perPage));
  changePageFn(1);
}

function modeClass(mode: string) {
  return showMode.value === mode ? 'bg-sky-300' : 'bg-gray-200';
}

</script>
  