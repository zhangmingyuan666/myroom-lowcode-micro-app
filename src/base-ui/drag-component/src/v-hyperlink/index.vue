<!--
 * @Date: 2022-10-19 23:01:26
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 01:18:19
 * @FilePath: \myroom\src\base-ui\drag-component\src\v-hyperlink\index.vue
 * @description: none
-->
<template>
  <BaseDragComponent :content="content">
    <a :href="href" class="h-full w-full">{{ content }}</a>
  </BaseDragComponent>
</template>

<script setup lang="ts">
import { BaseDragComponent } from '../../'
import { defineProps } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: '#'
  }
})
</script>

<style lang="less" scoped></style>
