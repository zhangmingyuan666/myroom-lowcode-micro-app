/*
 * @Date: 2022-10-19 22:14:48
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-19 22:34:29
 * @FilePath: \myroom\src\base-ui\form\src\hooks\form-hooks.ts
 * @description: none
 */
interface formActionOptions {
  inputChange?: ([key]?: any) => void
}

const useForm = (options: formActionOptions = {}) => {
  const inputChange = () => {
    return null
  }

  return {
    inputChange
  }
}

export default useForm
