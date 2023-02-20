<template>
  <div class="Modal">
    <div class="modal-block" 
      :style="`
        width: ${props.width}${props.widthCalcUnit}; 
        height: ${props.height}${props.heightCalcUnit}; 
        top: ${props.top}${props.topCalcUnit}; 
      `" 
      v-click-outside="normalClickOutSide">
      <slot></slot>
      <span class="close-icon" @click="props.closeFn">
        <font-awesome-icon class="cursor-pointer" icon="times"/>
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
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

const normalClickOutSide = (isOutSide: boolean) => {
  if (props.isBackgroundClose && isOutSide) {
    props.closeFn();
  }
}
</script>

<style>

</style>