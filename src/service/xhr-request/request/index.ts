/*
 * @Date: 2022-10-26 20:20:21
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-27 01:07:15
 * @FilePath: \myroom\src\service\xhr-request\request\index.ts
 * @description: none
 */
const request = ({
  url = '',
  method = 'post',
  data = '' as any,
  headers = {} as any,
  onProgress = (e: any) => e,
  requestList = [] as any
}) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.upload.onprogress = onProgress
    xhr.open(method, url)
    Object.keys(headers).forEach((key: any) =>
      xhr.setRequestHeader(key, headers[key])
    )
    xhr.send(data)

    // 成功后自然可以清掉了
    // 从xhr列表中进行清除
    xhr.onload = (e: any) => {
      if (requestList) {
        const xhrIndex = requestList.findIndex((item: any) => item === xhr)
        requestList.splice(xhrIndex, 1)
      }

      resolve({
        data: e.target.response
      })
    }

    // 将当前xhr暴露给外部
    requestList?.push(xhr)
  })
}

export default request
