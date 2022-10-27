<!--
 * @Date: 2022-10-19 23:10:40
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-19 23:37:39
 * @FilePath: \myroom\src\base-ui\drag-component\src\v-text\index.vue
 * @description: none
-->
<template>
  <BaseDragComponent :content="content">
    <span class="h-full w-full">{{ content }}</span>
  </BaseDragComponent>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { BaseDragComponent } from '../../'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped></style>
