<!--
 * @Date: 2022-10-19 23:01:26
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 00:23:12
 * @FilePath: \myroom\src\base-ui\drop-target\src\index.vue
 * @description: none
-->
<template>
  <div
    :style="{ width: '400px', height: '400px' }"
    class="relative shadow-lg"
    @mouseup="onMouseUpToDrag($event)"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import useMouseActions from '@/hooks/mouse-hook'
const { onMouseUpToDrag } = useMouseActions()
</script>

<style lang="less" scoped></style>
