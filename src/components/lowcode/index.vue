<!--
 * @Date: 2022-10-19 21:27:42
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 15:42:00
 * @FilePath: \myroom\src\components\lowcode\index.vue
 * @description: none
-->
<template>
  <div
    class="main"
    @mousedown="onMouseDownToDrag($event)"
    @mousemove="onMouseMoveToDrag($event)"
  >
    <div class="main-left"><LeftSource /></div>
    <div class="main-canvas mx-4"><Canvas /></div>
    <div class="main-form">
      <ControllerForm />
    </div>
    <CloneComponent></CloneComponent>
  </div>
</template>

<script setup lang="ts">
import { LeftSource, ControllerForm, Canvas } from './'
import { CloneComponent } from '@/base-ui/drag-component'
import useMouseActions from '@/hooks/mouse-hook'

const { onMouseDownToDrag, onMouseMoveToDrag } = useMouseActions()
</script>

<style scoped lang="less">
.main {
  display: flex;
  flex-direction: row;

  &-form {
    flex: 1;
  }
}
</style>
