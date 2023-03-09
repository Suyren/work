<template lang="pug">
div(class="bg-black/40 fixed top-0 left-0 right-0 bottom-0 z-10")
  div(class="my-0 mx-auto rounded-md bg-white relative" 
    :style="modalContentStyle" 
    v-click-outside="normalClickOutSide")
    div(class="p-8 overflow-auto h-full")
      slot
    span(class="absolute top-5 right-5 flex justify-center items-center cursor-pointer" @click="props.closeFn")
      font-awesome-icon(class="cursor-pointer text-xl" icon="times")
</template>

<script setup lang='ts'>import { computed } from 'vue';

type unit = '%' | 'px';
type widthUnit = 'vw' | unit;
type heightUnit = 'vh' | unit;

interface Props {
  closeFn: () => void // 關閉時的callback
  isBackgroundClose?: boolean // 背景點擊時是否關閉modal
  width?: number, // 寬度值
  height?: number, // 高度值
  widthCalcUnit?: widthUnit, // 寬度單位
  heightCalcUnit?: heightUnit, // 高度單位
  top?: number, // top座標值
  topCalcUnit?: heightUnit // top座標單位
}

const props = withDefaults(defineProps<Props>(), {
  isBackgroundClose: true,
  width: 90,
  height: 70,
  widthCalcUnit: '%',
  heightCalcUnit: 'vh',
  top: 15,
  topCalcUnit: 'vh',
});

const modalContentStyle = computed(() => {
  return `
    width: ${props.width}${props.widthCalcUnit}; 
    height: ${props.height}${props.heightCalcUnit}; 
    top: ${props.top}${props.topCalcUnit}; 
  `
})

const normalClickOutSide = (isOutSide: boolean) => {
  if (props.isBackgroundClose && isOutSide) {
    props.closeFn();
  }
}
</script>
