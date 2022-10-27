/*
 * @Date: 2022-10-26 12:13:21
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-26 12:14:38
 * @FilePath: \myroom\src\hooks\toggle-hook\index.ts
 * @description: none
 */
const useToggle = () => {
  const status = ref(false)
  const toggleStatus = () => {
    status.value = !status.value
  }

  return {
    status,
    toggleStatus
  }
}

export default useToggle
