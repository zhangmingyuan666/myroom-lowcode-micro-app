<!--
 * @Date: 2022-10-20 17:33:50
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 21:24:04
 * @FilePath: \myroom\src\components\lowcode\canvas\component-renderer\component-renderer.vue
 * @description: none
-->
<template>
  <template v-for="dragComponent of dragComponentList" :key="dragComponent.id">
    <SizeController
      :dragInfoStyle="dragComponent.style"
      :compid="dragComponent.id"
    >
      <DragSource :tag="dragComponent.tag" :compid="dragComponent.id">
        <BaseDragComponent
          :type="dragComponent.tag"
          :content="dragComponent.content"
        ></BaseDragComponent>
      </DragSource>
      <!-- 递归组件实现组件的嵌套 -->
      <ComponentRenderer
        v-if="dragComponent.children?.length"
        :dragComponentList="dragComponent.children"
      ></ComponentRenderer>
    </SizeController>
  </template>
</template>

<script setup lang="ts">
import { PropType, defineProps } from 'vue'
import { IDragComponent } from '@/stores/drag/types'
import { BaseDragComponent } from '@/base-ui/drag-component'
import DragSource from '@/base-ui/drag-source'
import SizeController from '../size-controller/index.vue'

const props = defineProps({
  dragComponentList: {
    type: Array as PropType<IDragComponent[]>
  }
})
</script>

<style lang="less" scoped></style>
