<!--
 * @Date: 2022-10-26 11:58:29
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-26 13:15:27
 * @FilePath: \myroom\src\base-ui\file-uploader\src\index.vue
 * @description: none
-->
<template>
  <el-button v-if="!status" @click="toggleStatus">按我上传文件子</el-button>
  <el-dialog v-else v-model="status" title="文件断点上传">
    <Uploader />
  </el-dialog>
</template>

<script setup lang="ts">
import Uploader from './uploader.vue'
import useToggle from '@/hooks/toggle-hook'
const { status, toggleStatus } = useToggle()
</script>

<style lang="scss" scoped></style>
