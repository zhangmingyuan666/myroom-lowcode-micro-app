<!--
 * @Date: 2022-10-19 23:18:39
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 22:11:01
 * @FilePath: \myroom\src\base-ui\drag-component\src\base\index.vue
 * @description: none
-->
<template>
  <div class="w-full h-full component">
    <!-- 如果我们没有传入值，那么显示默认值 -->
    <template v-if="content">
      <template v-if="type === DRAG_COMPONENT_TYPE.IMAGE">
        <img :src="content" class="h-full w-full component-child" />
      </template>
      <template v-if="type === DRAG_COMPONENT_TYPE.HYPERLINK">
        <a :href="href" class="h-full w-full component-child">{{ content }}</a>
      </template>
      <template v-if="type === DRAG_COMPONENT_TYPE.TEXT">
        <span class="h-full w-full component-child">{{ content }}</span>
      </template>
      <template v-if="type === DRAG_COMPONENT_TYPE.VIDEO">
        <video :src="content" class="h-full w-full component-child"></video>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </template>
    <!-- 如果我们没有传入值，那么显示默认值 -->
    <template v-else>
      <span class="h-full w-full component-child">{{ type }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { DRAG_COMPONENT_TYPE } from '../types'
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="less">
.component {
  // 此处防止pointer-events:none，将事件全部托管到drag-source组件上
  pointer-events: none;
  .component-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
