import {
  commitOneFileChunk,
  mergeFileChunksRequest,
  testChunkBeforeCommit
} from '@/service/xhr-request/file-uploader'
import handleFile from './handle-file-hooks'

/*
 * @Date: 2022-10-26 11:58:44
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-27 02:34:49
 * @FilePath: \myroom\src\base-ui\file-uploader\src\file-upload-hooks.ts
 * @description: none
 */
const useFileUpload = () => {
  const { transfromFileToArray, transfromChunkToHashWidthWorker } = handleFile()
  // 此处用于配置对于文件配置的常见属性
  const SIZE = 1 * 1024 * 1024 // 设置分片大小
  const uploadOptions = ref({
    chunkList: [] as any,
    dataList: [] as any, // 表示各个分片的状态
    uploadedList: [] as any, // 已经发送的List，下一次不用发送了
    //shouldUpload: [] as any, // 应该上传的List
    requestList: [] as any,
    file: null as any,
    hash: '', // 文件hash
    worker: null as any,
    hashPercentage: 0
  })
  // 此处执行上传文件的流程
  const uploadFileAction = (e: any) => {
    const [file] = e.target.files
    if (!file) return
    resetData()
    uploadOptions.value.file = file
  }

  // 此处上传转文件为hash的流程
  const handleFileHashAction = async () => {
    const fileChunkList = transfromFileToArray(uploadOptions.value.file, SIZE) // 此时将文件切割为数组
    uploadOptions.value.chunkList = [...fileChunkList]
    console.log(uploadOptions.value.chunkList)
    const hash = await transfromChunkToHashWidthWorker(
      uploadOptions,
      fileChunkList
    )
    uploadOptions.value.hash = hash as any
  }

  // 处理文件上传
  const handleFileUpload = async () => {
    // temp 此时将分片个数以及hash发给后端，查看是否需要妙传
    const res = await testChunkBeforeCommit({
      size: SIZE,
      fileHash: uploadOptions.value.hash,
      chunkCountStr: uploadOptions.value.chunkList.length
    })

    // 如果当前返回这个值，代表已经完全传输/文件过大，可以停止
    if ([4001, 4002].includes(res.data.Code)) {
      return false
    }
    // **********************
    const uploadedList = res.data.Data // 此时获取已经上传成功的uploadedList列表
    uploadOptions.value.uploadedList = uploadedList
    // 此时对所有的Data进行遍历，将数据进行处理变得后端更易于识别
    uploadOptions.value.dataList = uploadOptions.value.chunkList.map(
      ({ file }: any, index: number) => {
        const fileHash = uploadOptions.value.hash
        return {
          fileHash, // 获取文件的hash值
          index, // 当前是哪个分片？ 0
          hash: fileHash + '-' + index, // hash-1
          chunk: file, // 二进制流
          size: file.size, // 当前chunk的大小
          percentage: uploadOptions.value.uploadedList.includes(index) ? 100 : 0 // 进度条
        }
      }
    )

    await uploadChunk(uploadOptions.value.uploadedList) // 进行真正的操作
  }

  // 处理将fileChunks变成xhr数组
  const handleFileChunksToRequestList = (uploadedList: any[]) => {
    const list = uploadOptions.value.dataList
      .filter(({ hash, index }: any) => {
        // 首先将当前数组中的
        return !uploadedList.includes(index)
      })
      .map(({ chunk, hash, index }: any) => {
        const formData = new FormData()
        formData.append('chunk', chunk) // 二进制流
        formData.append('hash', hash) // hash-01
        formData.append('filename', uploadOptions.value.file.name) // 1.png
        formData.append('fileHash', uploadOptions.value.hash) // hash
        formData.append('seq', index)

        return {
          formData,
          index
        }
      })
      .map(({ formData, index }: any) => {
        // 此处进行request请求的封装，将所有请求包裹在一个数组里
        return commitOneFileChunk({
          formData,
          callbackWhenSucceed: createProgressHandler(
            uploadOptions.value.dataList[index]
          ),
          requestList: uploadOptions.value.requestList // 注册实践的时候，会全部push进去
        })
      })

    return list
  }

  // 上传分片
  const uploadChunk = async (uploadedList: any[]) => {
    const requestList = handleFileChunksToRequestList(uploadedList) // 封装为请求

    try {
      await Promise.all(requestList)
      // 如果有reject将会报错，所以拿tryCatch进行获取错误，如果出现网络错误？那么进行重发
      if (
        uploadOptions.value.uploadedList.length + requestList.length ===
        uploadOptions.value.chunkList.length
      ) {
        // 此时去merge一下，如果merge失败，那么说明需要冲跑逻辑了
        const res = await mergeFileChunksRequest({
          fileHash: uploadOptions.value.hash,
          filename: uploadOptions.value.file.name
        })

        // 如果merge失败，返回分片较少，如何处理？
      }
    } catch (err) {
      // 出现err，会进行重发？逻辑没写
    }
  }

  // 处理恢复操作
  const handleResume = async () => {
    // 获取已经更新的列表
    const res = await testChunkBeforeCommit({
      chunkCount: uploadOptions.value.chunkList.length,
      size: SIZE,
      fileHash: uploadOptions.value.hash
    })

    const uploadedList = res.data.Data
    uploadOptions.value.uploadedList = uploadedList
    await uploadChunk(uploadOptions.value.uploadedList)
  }

  // 暂停
  const handlePause = () => {
    resetData() // 清空所有request
  }

  // 将所有的请求清空
  const resetData = () => {
    // 将所有请求清空
    uploadOptions.value.requestList.forEach((xhr: any) => xhr.abort())
    uploadOptions.value.requestList = [] // 我此时清空everything
    if (uploadOptions.value.worker) {
      uploadOptions.value.worker.onmessage = null
    }
  }

  const uploadPercentage = computed(() => {
    if (!uploadOptions.value.file || !uploadOptions.value.dataList.length) {
      return 0
    }

    const loaded = uploadOptions.value.dataList
      .map((item: any) => item.size * item.percentage)
      .reduce((acc: any, cur: any) => acc + cur)

    return Math.floor(loaded / uploadOptions.value.file.size)
  })

  return {
    uploadOptions,
    uploadFileAction,
    handleFileHashAction,
    handleFileUpload,
    handleResume,
    handlePause,
    uploadPercentage
  }
}

export default useFileUpload

function createProgressHandler(item: any) {
  return (e: any) => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100)) // 设置百分比
  }
}
