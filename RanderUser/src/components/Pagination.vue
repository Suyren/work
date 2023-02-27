<template>
  <div class="Pagination">
    <div :class="[{'disabled': currentPage === 1}]" @click="firstPage">
      <i class="uil uil-angle-double-left limit-btn"></i>
    </div>
    <div :class="[{'disabled': currentPage === 1}]" @click="prevPage">
      <i class="uil uil-angle-left"></i>
    </div>
    <div :class="['page', {'active': page === currentPage}]"
      v-for="(page, index) in calcPage" 
      :key="index"
      @click="clickPage(page)">{{ page }}</div>
    <div :class="[{'disabled': currentPage === totalPage}]" @click="nextPage">
      <i class="uil uil-angle-right"></i>
    </div>
    <div :class="[{'disabled': currentPage === totalPage}]" @click="lastPage">
      <i class="uil uil-angle-double-right limit-btn"></i>
    </div>
    <select class="mr-2" v-model="numberOfRowsPerPage" @change="changePerpage(numberOfRowsPerPage)">
      <option v-for="page in props.perPageList" :value="page.value">{{ page.text }}</option>
    </select>
    <span>
      <input class="jump-paging" type="text" v-model="inputPage" @keydown="pageInput">
    </span>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, ref, watch } from 'vue';
import { KeyValue } from '@/model/common';

interface Props {
  // 總頁數
  totalPage: number,
  // 目前頁數
  currentPage: number,
  // 更換頁數callback
  changePageFn: (page: number) => void
  // 一頁幾筆
  numberOfRowsPerPage: number
  // 一頁幾筆列表
  perPageList: KeyValue[]
  // 切換一頁幾筆callback
  changeNumberOfRowsPerPage: (page: number) => void
}

const props = withDefaults(defineProps<Props>(), {
  perPageList: () => [
    { text: '10', value: 10 },
    { text: '20', value: 20 },
    { text: '30', value: 30 },
    { text: '40', value: 40 },
    { text: '50', value: 50 },
    { text: '60', value: 60 },
    { text: '70', value: 70 },
    { text: '80', value: 80 },
    { text: '90', value: 90 },
    { text: '100', value: 100 },
  ]
});

const {
  currentPage,
  totalPage,
} = toRefs(props);

const numberOfRowsPerPage = ref(props.numberOfRowsPerPage);

watch(() => currentPage.value, (newValue: number) => {
  inputPage.value = newValue;
})

const inputPage = ref(currentPage.value);

const calcPage = computed(() => {
  if (totalPage.value <= 5) {
    const arr = [];
    for (let i = 1 ; i <= totalPage.value ; i++) {
      arr.push(i);
    }
    return arr;
  }
  if (currentPage.value - 2 < 2) {
    return [1, 2, 3, 4, 5]
  }
  if (currentPage.value + 2 > totalPage.value) {
    return [totalPage.value - 4, totalPage.value - 3, totalPage.value - 2, totalPage.value - 1, totalPage.value]
  }
  return [currentPage.value - 2, currentPage.value - 1, currentPage.value, currentPage.value + 1, currentPage.value +2];
});
const changePageFn = props.changePageFn;
const clickPage = (page:number) => {
  if (currentPage.value === page) {
    return;
  }
  changePageFn(page);
}
const nextPage = () => {
  if (currentPage.value === totalPage.value) {
    return;
  }
  changePageFn(currentPage.value + 1);
}
const prevPage = () => {
  if (currentPage.value === 1) {
    return;
  }
  changePageFn(currentPage.value - 1);
}
const firstPage = () => {
  if (currentPage.value === 1) {
    return;
  }
  changePageFn(1);
}
const lastPage = () => {
  if (currentPage.value === totalPage.value) {
    return;
  }
  changePageFn(totalPage.value);
}
// 跳轉頁面執行的function
function pageInput(e: KeyboardEvent) {
  if (e.key !== 'Enter') {
    return;
  }
  const page = Number(inputPage.value);
  if (Number.isNaN(page)) {
    alert('請輸入正確的頁碼');
    (e.target as HTMLInputElement).blur();
    return;
  }
  if (page <= 0) {
    changePageFn(1);
    return;
  }
  if (page > totalPage.value) {
    changePageFn(totalPage.value);
    return;
  }
  if (currentPage.value !== page) {
    changePageFn(page);
  }
}
// 切換一頁幾筆
function changePerpage(numberOfRowsPerPage: number) {
  props.changeNumberOfRowsPerPage(numberOfRowsPerPage);
}

</script>