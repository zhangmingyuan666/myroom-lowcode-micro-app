<!--
 * @Date: 2022-10-19 21:27:42
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 15:20:54
 * @FilePath: \myroom\src\components\lowcode\form\index.vue
 * @description: none
-->
<template>
  <div>
    <CustomForm
      v-model="formData"
      :formConfigList="formConfigList"
      :key="key"
    />
  </div>
</template>

<script setup lang="ts">
import CustomForm from '@/base-ui/form'
import { useDragStore } from '@/stores/drag'
import { DRAG_ACTIONS_TYPE } from '@/stores/drag/types'

const store = useDragStore()
const getCurrentFomrData = () => {
  const { content, style } = store.currentComponentForm
  return {
    content,
    ...style
  }
}
const formData = ref(getCurrentFomrData())
const key = ref(0)
watch(
  () => formData.value,
  (newValue) => {
    store.editComponentWithConfig(newValue)
  },
  {
    deep: true,
    flush: 'post'
  }
)

watch(
  () => {
    return store.type
  },
  (newValue) => {
    if (newValue === DRAG_ACTIONS_TYPE.NONE) {
      formData.value = getCurrentFomrData()
      key.value++
    }
  }
)

// watch(
//   () => store.currentComponentForm.id,
//   () => {
//     console.log('我被更改了')

//     console.log(formData.value)
//   }
// )

const formConfigList = [
  {
    tag: 'input',
    prop: 'content',
    label: '账号'
  },
  {
    tag: 'input',
    prop: 'width',
    label: '宽度'
  },
  {
    tag: 'input',
    prop: 'height',
    label: '高度'
  },
  {
    tag: 'input',
    prop: 'top',
    label: 'top'
  },
  {
    tag: 'input',
    prop: 'left',
    label: 'left'
  }
]
</script>

<style scoped></style>
