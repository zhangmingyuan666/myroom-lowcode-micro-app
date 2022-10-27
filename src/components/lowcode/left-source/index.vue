<!--
 * @Date: 2022-10-19 21:27:42
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 22:58:15
 * @FilePath: \myroom\src\components\lowcode\left-source\index.vue
 * @description: none
-->
<template>
  <div class="left">
    <template
      v-for="dragComponentType of DRAG_COMPONENT_TYPE"
      :key="dragComponentType"
    >
      <DragSource :type="dragComponentType">
        <BaseDragComponent :type="dragComponentType"></BaseDragComponent>
      </DragSource>
    </template>
  </div>
</template>

<script setup lang="ts">
import DragSource from '@/base-ui/drag-source'
import {
  BaseDragComponent,
  DRAG_COMPONENT_TYPE
} from '@/base-ui/drag-component'
</script>

<style scoped lang="less">
.left {
  & > div {
    position: relative;
    height: 40px;
    width: 100px;
    max-width: 100px;
    padding: 5px;
    margin: 10px 0;
    background: #ccc;
  }
}
</style>
