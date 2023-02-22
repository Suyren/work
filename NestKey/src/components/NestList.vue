<template lang="pug">
ul(class="text-left ml-4")
  li(v-for="item in props.nestList")
    span(v-if="item.children" class="cursor-pointer" @click="() => { toggle(item) }") {{ `${item.name} ${item.isOpen ? '[-]' : '[+]'} ` }}
    span(v-else) {{ `${item.name}: ` }}
    span(v-if="!item.children" :ref="el => setRef(el, item.refName)") {{ item.value }}
    NestList(v-if="item.children" v-show="item.isOpen" :nestList="item.children" :setRef="props.setRef")
    
</template>

<script setup lang="ts">
import type { PeopleInfo } from '@/model/components/Card';
import { computed, ref } from 'vue';
import type { NestListModel } from '@/model/views/NestKey';

const props = defineProps<{
  nestList: NestListModel[]
  setRef: (el: HTMLElement, refName: string) => void
}>()

function setRef(el: HTMLElement, refName: string) {
  props.setRef(el, refName);
}
function toggle(item:NestListModel) {
  item.isOpen = !item.isOpen
}
</script>