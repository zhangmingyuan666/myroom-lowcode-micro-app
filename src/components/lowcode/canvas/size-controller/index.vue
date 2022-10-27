<!--
 * @Date: 2022-10-20 18:12:06
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 23:35:10
 * @FilePath: \myroom\src\components\lowcode\canvas\size-controller\index.vue
 * @description: none
-->
<template>
  <div :style="[caculateStyle]" class="absolute" :compid="compid">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { IDragComponentStyle } from '@/stores/drag/types'
import { defineProps, PropType } from 'vue'

const props = defineProps({
  dragInfoStyle: {
    type: Object as PropType<IDragComponentStyle>,
    require: true
  },
  compid: {
    type: String,
    default: ''
  }
})

const caculateStyle = computed(() => {
  const { width, height, top, left } = props.dragInfoStyle!
  return {
    transform: `translate(${left}px, ${top}px)`,
    border: '1px solid #ccc',
    width: width + 'px',
    height: height + 'px',
    top: 0,
    left: 0
  }
})
</script>

<style lang="scss" scoped></style>
