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
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
const props = defineProps<{
  // 總頁數
  totalPage: number,
  // 目前頁數
  currentPage: number,
  // 更換頁數callback
  changePageFn: (page: number) => void
}>()

const {
  currentPage,
  totalPage,
} = toRefs(props);
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
</script>

<style lang="scss">
.Pagination {
  display: flex;
  justify-content: center;
  user-select: none;
  color: grey;
  > div {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: blue;
      color: #fff;
    }
    &.active {
      background-color: blue;
      color: #fff;
    }
    &.disabled {
      color: grey;
      &:hover {
        background-color: #fff;
      }
    }
    > .uil {
      font-size: 22px;
      &.limit-btn {
        font-size: 28px;
      }
    }
  }
}
</style>