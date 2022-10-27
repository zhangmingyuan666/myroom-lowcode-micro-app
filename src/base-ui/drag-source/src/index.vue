<!--
 * @Date: 2022-10-19 23:01:26
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 16:14:54
 * @FilePath: \myroom\src\base-ui\drag-source\src\index.vue
 * @description: none
-->
<template>
  <div
    @mousedown="changeDragType"
    ref="dragSourceRef"
    :compid="compid"
    class="source"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { useDragStore } from '@/stores/drag'
import { DRAG_ACTIONS_TYPE } from '@/stores/drag/types'
import { DRAG_COMPONENT_TYPE } from '@/base-ui/drag-component'
const store = useDragStore()
const dragSourceRef = ref<HTMLElement | null>(null)

const props = defineProps({
  compid: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<DRAG_COMPONENT_TYPE>
  }
})

// 此处因为要获取点击后的位置，所以不应该取消事件冒泡（相当于对父类的拓展）
function changeDragType(e: MouseEvent) {
  // 根据有无compid执行不同的决策
  if (props.compid) {
    store.handleDragTypeChange(DRAG_ACTIONS_TYPE.EDIT_ELEMENT)
  } else {
    store.handleDragTypeChange(DRAG_ACTIONS_TYPE.CREATE_ELEMENT)
    store.$patch({ currentComponentType: props.type }) // 预定义下一次进行执行的变量
  }
}
</script>

<style lang="less" scoped>
// 防止出现一不小心出现的拖拽效果
.source {
  user-select: none;
}
</style>
