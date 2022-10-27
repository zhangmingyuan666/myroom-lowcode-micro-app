/*
 * @Date: 2022-10-27 00:31:49
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-27 01:14:02
 * @FilePath: \myroom\src\service\xhr-request\file-uploader\index.ts
 * @description: none
 */
/*
 * @Date: 2022-10-27 00:31:49
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-27 01:06:35
 * @FilePath: \myroom\src\service\xhr-request\file-uploader\index.ts
 * @description: none
 */
import axios from 'axios'
import request from '../request'

enum FILE_UPLOADER_API {
  COMMIT = '/api/fileupload/commit',
  MERGE = '/api/mergefile',
  TEST_CHUNK_CONFIG = '/api/fileupload/testinfo'
}

// 此处用于提交分片
export function commitOneFileChunk({
  formData,
  callbackWhenSucceed,
  requestList
}: any) {
  return request({
    url: FILE_UPLOADER_API.COMMIT,
    data: formData,
    onProgress: callbackWhenSucceed,
    requestList
  })
}

// merge汇集分片
export function mergeFileChunksRequest({ fileHash, filename }: any) {
  const formData = new FormData()
  formData.append('fileHash', fileHash)
  formData.append('filename', filename)
  return request({
    url: FILE_UPLOADER_API.MERGE,
    data: formData
  })
}

// 请求前发送的预备请求，用于告知分片大小，个数，hash给服务端
// 返回值：uploadedList的大小
export function testChunkBeforeCommit({ chunkCount, size, fileHash }: any) {
  return axios.get(FILE_UPLOADER_API.TEST_CHUNK_CONFIG, {
    params: {
      chunkCountStr: chunkCount,
      fileHash,
      size
    }
  })
}
