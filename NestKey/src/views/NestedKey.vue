<template lang="pug">
div(class="text-center selection:bg-green-100 flex justify-between p-6")
  div(class="w-1/2 p-4 border border-neutral-400")
    div(class="text-left mb-4")
      button(class="border-neutral-400 px-4 bg-blue-300 rounded" @click="addNestData") +Add New Pair
    ul(class="w-full")
      li(v-for="item in nestData" class="flex items-center mb-2")
        div(class="w-2/5")
          input(class="block rounded-md border border-gray-300 px-2 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            v-model="item.str"
            @input="renderNestKey")
        div(class="w-2/5")
          input(class="block rounded-md border border-gray-300 px-2 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
            v-model="item.value"
            @input="() => { updateNestValue(item) }")
        button(class="p-2 border-neutral-400 px-4 bg-blue-300 rounded") -
  div(class="w-1/2 flex justify-center p-4 border border-neutral-400")
    div(v-if="nestList.length" class="w-full")
      NestList(:nestList="nestList" :setRef="setRef")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import NestList from '@/components/NestList.vue';
import type { NestListModel, NestData } from '@/model/views/NestKey';

const nestData: Ref<NestData[]> = ref([
  { str: 'com.a.b', value: '123' },
  { str: 'com.c.d', value: '333' },
])

const set: Ref<any> = ref({})
const nestList: Ref<any> = ref([]);
const vue_refs: Ref<any> = ref({});

function addNestData() {
  nestData.value.push({ str: '', value: '' });
}


function deal(nest: any) {
  const strSplit = nest.str.split('.');
  let finalIndex = strSplit.length - 1;
  if (!strSplit[finalIndex]) {
    strSplit.splice(finalIndex, 1);
    finalIndex--;
  }
  strSplit.reduce((prev: any, item: string, i: number) => {
    if (!prev[item] && i !== finalIndex) {
      prev[item] = {};
    }
    if (!prev[item] && i === finalIndex) {
      prev[item] = nest.value;
    }
    return prev[item];
  }, set.value)
}

function setRef(el: HTMLElement, refName: string) {
  vue_refs.value[refName] = el;
}

function transToNested(obj: any, refName: string) {
  let list: NestListModel[] = [];
  for (let keyName in obj) {
    let temp: NestListModel = {
      name: keyName,
      isOpen: true
    }
    if (typeof obj[keyName] === 'object') {
      const name = refName ? `${refName}.` : refName;
      temp.children = transToNested(obj[keyName], `${name}${keyName}`)
    }
    if (typeof obj[keyName] === 'string') {
      temp.value = obj[keyName]
      temp.refName = refName ? `${refName}.${keyName}` : keyName;
    }
    list.push(temp);
  }
  return list;
}

function renderNestKey() {
  vue_refs.value = {};
  set.value = {};
  nestData.value.forEach(item => {
    deal(item);
  })
  nestList.value = transToNested(set.value, '');
}

function updateNestValue(item: any) {
  vue_refs.value[item.str].textContent = item.value;
}

renderNestKey();


</script>
