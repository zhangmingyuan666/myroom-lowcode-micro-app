<!--
 * @Date: 2022-10-19 23:11:02
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-19 23:36:49
 * @FilePath: \myroom\src\base-ui\drag-component\src\v-video\index.vue
 * @description: none
-->
<template>
  <BaseDragComponent :content="content">
    <video :src="content" class="h-full w-full"></video>
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
