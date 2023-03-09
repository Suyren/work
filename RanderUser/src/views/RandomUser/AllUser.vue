<template lang="pug">
div(class="flex justify-end items-center mb-4")
  div(class="flex")
    button(:class="['mr-6 w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('card')]" @click="() => { changeMode('card') }")
      font-awesome-icon(icon="grip-horizontal")
    button(:class="['w-10 h-10 p-2 rounded-md hover:bg-sky-300', modeClass('list')]" @click="() => { changeMode('list') }")
      font-awesome-icon(icon="list")
ul( class="mb-8 h-[calc(100%_-_8rem)] overflow-auto relative")
  li(v-for="peopleInfo in peopleInfoList" :key="peopleInfo.id" :class="['mx-4 mb-4', {'inline-block': showMode === 'card'}]")
    Card(v-if="showMode === 'card'" :peopleInfo="peopleInfo" :selectPeople="selectPeople")
    CardList(v-else :peopleInfo="peopleInfo" :selectPeople="selectPeople")
  font-awesome-icon(v-if="isCallAPI" icon="circle-notch" class="animate-spin text-2xl absolute left-2/4 top-4")
  
Pagination(:totalPage="totalPage" :currentPage="currentPage" :changePageFn="changePageFn" :numberOfRowsPerPage="numberOfRowsPerPage" :changeNumberOfRowsPerPage="changeNumberOfRowsPerPage")
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
import axios from "axios";
import { computed, ref } from "vue";
import type { Ref } from 'vue';
import type { PeopleInfo } from "@/model/components/Card";
import Card from '@/components/Card.vue';
import CardList from '@/components/CardList.vue';
import Pagination from '@/components/Pagination.vue';
import Modal from '@/components/Modal.vue';

// 記錄所有資料總數
const totalData = 3010;
// 使用者的資料列表
const peopleInfoList: Ref<PeopleInfo[]> = ref([]);
// 紀錄當前顯示卡片or列表
const showMode = ref(localStorage.getItem('showMode') ? localStorage.getItem('showMode') : 'card');
// 是否顯示modal
const isShowModal = ref(false);
// 記錄一頁幾筆
const numberOfRowsPerPage = ref(localStorage.getItem('perPage') ? Number(localStorage.getItem('perPage')) : 30);
// 紀錄當前頁面
const currentPage = ref(localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1);
// 紀錄當前選擇的使用者
const currentSelectPeople = ref(null) as unknown as Ref<PeopleInfo>;
// 計算總頁碼
const totalPage = computed(() => {
  return Math.ceil(totalData / numberOfRowsPerPage.value);
})
// 根據所有資料總數和一頁幾筆來計算api要給的數量
const calcAPICount = computed(() => {
  const isCompletePage = totalData % numberOfRowsPerPage.value === 0;
  return totalPage.value === currentPage.value && !isCompletePage
    ? totalData % numberOfRowsPerPage.value
    : numberOfRowsPerPage.value;
})
// 是否呼叫API
const isCallAPI = ref(false);
// 選擇使用者並打開modal
function selectPeople(people: PeopleInfo) {
  currentSelectPeople.value = people;
  toggleModal(true);
}

// 切換顯示卡片or列表
function changeMode(mode: string) {
  showMode.value = mode;
  localStorage.setItem('showMode', mode);
}

// modal開關函式
function toggleModal(status: boolean) {
  isShowModal.value = status;
}

// 給modal組件的關閉callback
function closeFn() {
  toggleModal(false);
}

// 切換頁碼
function changePageFn(page: number) {
  currentPage.value = page;
  localStorage.setItem('currentPage', `${page}`);
  peopleInfoList.value = [];
  getUserInfo();
}

// 切換一頁幾筆
function changeNumberOfRowsPerPage(perPage: number) {
  numberOfRowsPerPage.value = perPage;
  localStorage.setItem('perPage', String(perPage));
  changePageFn(1);
}

function modeClass(mode: string) {
  return showMode.value === mode ? 'bg-sky-300' : 'bg-gray-200';
}

// 取得使用者
function getUserInfo() {
  isCallAPI.value = true;
  axios.get(`https://randomuser.me/api/?page=${currentPage.value}&results=${calcAPICount.value}&seed=abc`).then((result: any) => {
    const data = result.data;
    peopleInfoList.value = data.results.map((people: any) => {
      return {
        id: people.login.uuid,
        headshot: people.picture.medium,
        largeHeadShot: people.picture.large,
        firstName: people.name.first,
        lastName: people.name.last,
        gender: people.gender,
        email: people.email,
        phone: people.phone,
        country: people.location.country,
        city: people.location.city,
        age: people.dob.age
      }
    })
    isCallAPI.value = false
  }).catch(err => {
    // error catch
    isCallAPI.value = false
  })
}

getUserInfo();

</script>
  