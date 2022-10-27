<!--
 * @Date: 2022-10-21 15:34:23
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 15:44:01
 * @FilePath: \myroom\src\base-ui\drag-component\src\clone-component\index.vue
 * @description: none
-->
<template>
  <div
    v-if="isShown"
    class="clonecomp absolute"
    :style="[getStyle]"
    @mousemove="move($event)"
  ></div>
</template>

<script setup lang="ts">
import { useDragStore } from '@/stores/drag'
import { DRAG_ACTIONS_TYPE } from '@/stores/drag/types'

const store = useDragStore()

const isShown = computed(() => {
  return (
    store.type === DRAG_ACTIONS_TYPE.CREATE_ELEMENT ||
    store.type === DRAG_ACTIONS_TYPE.EDIT_ELEMENT
  )
})

const getStyle = computed(() => {
  const { height, width } = store.currentComponentForm.style
  return {
    height: height + 'px',
    width: width + 'px'
  }
})

const position = reactive({
  top: 0,
  left: 0
})

const move = (e: MouseEvent) => {
  console.log(e)
}
</script>

<style lang="less" scoped>
.clonecomp {
  background: red;
}
</style>
