<!--
 * @Date: 2022-10-19 21:27:42
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 18:38:16
 * @FilePath: \myroom\src\components\lowcode\canvas\index.vue
 * @description: none
-->
<template>
  <DropTarget>
    <ComponentRenderer
      :dragComponentList="(dragComponentList as IDragComponent[])"
    ></ComponentRenderer>
  </DropTarget>
</template>

<script setup lang="ts">
import { useDragStore } from '@/stores/drag'
import DropTarget from '@/base-ui/drop-target'
import ComponentRenderer from './component-renderer/component-renderer.vue'
import { IDragComponent } from '@/stores/drag/types'

const store = useDragStore()

const dragComponentList = computed(() => store.dragComponentList)
console.log(dragComponentList.value)
</script>

<style scoped></style>
