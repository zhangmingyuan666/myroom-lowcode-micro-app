<!--
 * @Date: 2022-10-19 23:10:05
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 01:18:16
 * @FilePath: \myroom\src\base-ui\drag-component\src\v-image\index.vue
 * @description: none
-->
<template>
  <BaseDragComponent :content="content">
    <img :src="content" class="h-full w-full" />
  </BaseDragComponent>
</template>

<script setup lang="ts">
import { BaseDragComponent } from '../../'
import { defineProps } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped></style>
