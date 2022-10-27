<!--
 * @Date: 2022-10-26 12:17:14
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-27 02:40:36
 * @FilePath: \myroom\src\base-ui\file-uploader\src\uploader.vue
 * @description: none
-->
<template>
  <div>
    <input type="file" @change="uploadFileAction" />
    <div class="my-2">
      <el-button @click="handleFileHashAction">分块打包</el-button>
      <el-button @click="handleFileUpload">上传</el-button>
      <el-button @click="handlePause">暂停</el-button>
      <el-button @click="handleResume">恢复</el-button>
    </div>
    <div>
      <div>hash化进度条</div>
      <el-progress :percentage="hashPercentage" />
    </div>
    <div>
      <div>上传总进度条</div>
      <el-progress :percentage="uploadPercentage" />
    </div>
    <div>chunks进度条</div>
    <!-- 对每个分块创建进度条 -->
    <div>
      <template v-for="(item, index) of uploadOptions.dataList" :key="index">
        <el-progress :percentage="item.hashPercentage" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFileUpload from './file-upload-hooks'
const {
  uploadOptions,
  uploadFileAction,
  handleFileHashAction,
  handlePause,
  handleResume,
  handleFileUpload,
  uploadPercentage
} = useFileUpload()

const hashPercentage = computed(() => uploadOptions.value.hashPercentage)
</script>

<style lang="scss" scoped></style>
