<!--
 * @Date: 2022-10-19 21:56:32
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-26 12:08:15
 * @FilePath: \myroom\src\base-ui\form\src\index.vue
 * @description: none
-->
<template>
  <el-form>
    <template v-for="formConfig of formConfigList" :key="formConfig.prop">
      <el-form-item :label="formConfig.label">
        <template v-if="formConfig.tag === 'input'">
          <el-input v-model="formData[formConfig.prop]" />
        </template>
        <template v-if="formConfig.tag === 'file'">
          <FileUploader />
        </template>
      </el-form-item>
    </template>
    <el-form-item>
      <FileUploader />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, defineProps, defineEmits } from 'vue'
import useForm from './hooks/form-hooks'
import FileUploader from '@/base-ui/file-uploader'
const props = defineProps({
  modelValue: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  formConfigList: {
    type: Array as PropType<any>,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue'])

const formData = reactive({ ...props.modelValue }) // 将数组进行一次浅拷贝

watch(formData, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped></style>
