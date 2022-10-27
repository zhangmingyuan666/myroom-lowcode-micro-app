<!--
 * @Date: 2022-10-19 20:14:34
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-19 21:32:31
 * @FilePath: \myroom\src\views\Home.vue
 * @description: none
-->
<template>
  <el-container class="home-container h-full">
    <el-aside width="200px">
      <MainAside></MainAside>
    </el-aside>
    <el-container>
      <el-header>
        <MainHeader></MainHeader>
      </el-header>
      <el-main class="home-main">
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { MainAside, MainHeader, Main } from '@/components/main'
</script>

<style lang="less" scoped>
.home-main {
  overflow: auto;
}
</style>
