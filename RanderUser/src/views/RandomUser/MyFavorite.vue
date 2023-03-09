<template lang="pug">
div(class="flex justify-end items-center mb-4")
  div(class="flex")
    button(:class="['mr-6 w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('card')]" @click="() => { changeMode('card') }")
      font-awesome-icon(icon="grip-horizontal")
    button(:class="['w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('list')]" @click="() => { changeMode('list') }")
      font-awesome-icon(icon="list")
ul(v-if="peopleInfoList.length" class="mb-8 h-[calc(100%_-_8rem)] overflow-auto")
  li(v-for="peopleInfo in peopleInfoList[currentPage - 1]" :key="peopleInfo.id" :class="['mx-4 mb-4', {'inline-block': showMode === 'card'}]")
    Card(v-if="showMode === 'card'" :peopleInfo="peopleInfo" :selectPeople="selectPeople")
    CardList(v-else :peopleInfo="peopleInfo" :selectPeople="selectPeople")
div(v-else class="text-center text-sky-300 text-xl font-semibold") 您尚未加入任何人到我的收藏
Pagination(v-if="peopleInfoList.length" :totalPage="totalPage" :currentPage="currentPage" :changePageFn="changePageFn" :numberOfRowsPerPage="numberOfRowsPerPage" :changeNumberOfRowsPerPage="changeNumberOfRowsPerPage")
Modal(v-if="isShowModal" :width="40" :height="50" :closeFn="closeFn")
  div(class="mb-16")
    img(class="w-24 h-24 rounded-full mx-auto my-0" :src="currentSelectPeople.largeHeadShot")
  div
    div(class="flex justify-between mb-4")
      span(class="font-medium") 名字
      span {{ `${currentSelectPeople.firstName} ${currentSelectPeople.lastName}` }}
    div(class="flex justify-between mb-4")
      span(class="font-medium") 年齡
      span {{ currentSelectPeople.age }}
    div(class="flex justify-between mb-4")
      span(class="font-medium") 性別
      span {{ currentSelectPeople.gender }}
    div(class="flex justify-between mb-4")
      span(class="font-medium") 電話
      span {{ currentSelectPeople.phone }}
    div(class="flex justify-between mb-4")
      span(class="font-medium") 國籍
      span {{ currentSelectPeople.country }}
    div(class="flex justify-between mb-4")
      span(class="font-medium") 居住地
      span {{ currentSelectPeople.city }}
    div(class="flex justify-between mb-4")
      span(class="font-medium") E-Mail
      span {{ currentSelectPeople.email }}
</template>
  
<script setup lang="ts">
import { computed, ref } from "vue";
import type { Ref } from 'vue';
import type { PeopleInfo } from "@/model/components/Card";
import Card from '@/components/Card.vue';
import CardList from '@/components/CardList.vue';
import Pagination from '@/components/Pagination.vue';
import Modal from '@/components/Modal.vue';
import { useUserStore } from "@/store";

const userStore = useUserStore();

// 變數功能和AllUser組件大致相同，差在使用者資料全部存在localstorage
const showMode = ref(localStorage.getItem('showMode') ? localStorage.getItem('showMode') : 'card');
const isShowModal = ref(false);
const numberOfRowsPerPage = ref(localStorage.getItem('perPage') ? Number(localStorage.getItem('perPage')) : 30);
const currentPage = ref(localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1);
const currentSelectPeople = ref(null) as unknown as Ref<PeopleInfo>;
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

// 計算目前頁面要顯示的使用者列表
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

function selectPeople(people: PeopleInfo) {
  currentSelectPeople.value = people;
  toggleModal(true);
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
  