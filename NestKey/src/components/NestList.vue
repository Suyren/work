<template lang="pug">
ul(class="text-left ml-4")
  li(v-for="item in props.nestList")
    span(v-if="item.children" class="cursor-pointer flex items-center" @click="() => { toggle(item) }")
      span(class="pr-1") {{ `${item.name}` }} 
      | 【
      font-awesome-icon(v-if="item.isOpen" icon="minus")
      font-awesome-icon(v-else icon="plus")
      | 】
    span(v-else) {{ `${item.name}: ` }}
    span(v-if="!item.children" class="text-rose-400") {{ item.value }}
    NestList(v-if="item.children" v-show="item.isOpen" :nestList="item.children")
</template>

<script setup lang="ts">
import type { NestListModel } from '@/model/views/NestKey';

const props = defineProps<{
  nestList: NestListModel[]
}>()

function toggle(item: NestListModel) {
  item.isOpen = !item.isOpen
}
</script>