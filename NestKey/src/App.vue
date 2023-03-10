<template lang="pug">
div(class="text-center selection:bg-green-100 flex justify-between p-6")
  div(class="w-1/2 mr-2 p-4 border border-neutral-400 max-h-90-vh overflow-auto")
    div(class="text-left mb-4")
      button(class="border-neutral-400 px-4 py-2 bg-blue-300 rounded" @click="addNestData")
        font-awesome-icon(icon="plus" class="mr-2")
        | Add New Pair
    ul(class="w-full")
      li(v-for="(item, index) in nestData" class="flex items-center mb-2")
        div(class="w-5/12 mr-2")
          input(class="block w-full rounded-md border border-gray-300 px-2 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            v-model="item.nestText" placeholder="Key"
            @input="renderNestKey")
        div(class="w-5/12 mr-2")
          input(class="block w-full rounded-md border border-gray-300 px-2 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            v-model="item.value" placeholder="Value"
            @input="() => { updateNestValue(item) }")
        button(class="p-2 border-neutral-400 px-4 bg-blue-300 rounded w-1/12" @click="() => { removeNestData(index) }")
          font-awesome-icon(icon="minus")
  div(class="w-1/2 flex justify-center p-4 border border-neutral-400 max-h-90-vh overflow-auto")
    div(v-if="nestList.length" class="w-full")
      NestList(:nestList="nestList" :setRef="setRef")
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import NestList from '@/components/NestList.vue';
import type { NestListModel, NestData } from '@/model/views/NestKey';

// 左邊區塊data model
const nestData: Ref<NestData[]> = ref([
  { nestText: 'com.a.b', value: '123' },
  { nestText: 'com.c.d', value: '333' },
])

// 巢狀object結構 ex. com.c.d  因為結構無法預測所以型別使用any
// {
//   com: {
//     c: {
//       d: ''
//     }
//   }
// }
const nestObjectSet: Ref<any> = ref({});
// 巢狀組件使用的data model
const nestList: Ref<NestListModel[]> = ref([]);
// 紀錄巢狀最後一層的html dom 因為結構無法預測所以型別使用any
const vueRefs: Ref<any> = ref({});

// 新增左邊區塊data model
function addNestData() {
  nestData.value.push({ nestText: '', value: '' });
}

// 刪除左邊區塊data model
function removeNestData(index: number) {
  nestData.value.splice(index, 1);
  renderNestKey();
}

// 將左邊區塊data model轉成巢狀object結構
function handleData(nestData: NestData) {
  const strSplit = nestData.nestText.split('.');
  let finalIndex = strSplit.length - 1;
  if (!strSplit[finalIndex]) {
    strSplit.splice(finalIndex, 1);
    finalIndex--;
  }
  strSplit.reduce((prev: any, item: string, i: number) => {
    if (prev[item] && typeof prev[item] === 'string' && i !== finalIndex) {
      prev[item] = {};
    }
    if (!prev[item] && i !== finalIndex) {
      prev[item] = {};
    }
    if (!prev[item] && i === finalIndex) {
      prev[item] = nestData.value;
    }
    return prev[item];
  }, nestObjectSet.value)
}

// 儲存巢狀最後一層的html dom
function setRef(el: Element, refName: string) {
  vueRefs.value[refName] = el;
}

// 將巢狀object結構轉成巢狀組件使用的data model
function transToNested(nestObject: any, refName: string) {
  let list: NestListModel[] = [];
  for (let keyName in nestObject) {
    let temp: NestListModel = {
      name: keyName,
      isOpen: true
    }
    if (typeof nestObject[keyName] === 'object') {
      const name = refName ? `${refName}.` : refName;
      temp.children = transToNested(nestObject[keyName], `${name}${keyName}`)
    }
    if (typeof nestObject[keyName] === 'string') {
      temp.value = nestObject[keyName]
      temp.refName = refName ? `${refName}.${keyName}` : keyName;
    }
    list.push(temp);
  }
  return list;
}

// 渲染右邊預覽區塊
function renderNestKey() {
  vueRefs.value = {};
  nestObjectSet.value = {};
  nestData.value.forEach(item => {
    handleData(item);
  })
  nestList.value = transToNested(nestObjectSet.value, '');
}

// 更新最後一層的html dom文字
function updateNestValue(item: NestData) {
  if (vueRefs.value[item.nestText]) {
    vueRefs.value[item.nestText].textContent = item.value;
  }
}

renderNestKey();
</script>
  