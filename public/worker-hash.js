/*
 * @Date: 2022-10-26 11:45:54
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-26 15:18:57
 * @FilePath: \myroom\public\worker-hash.js
 * @description: none
 */
// 导入脚本
// import script for encrypted computing
self.importScripts('/spark-md5.min.js')

self.onmessage = (e) => {
  const { fileChunkList } = e.data
  const spark = new self.SparkMD5.ArrayBuffer()// 创建一个缓存区
  let percentage = 0
  let count = 0
  const targetChunkLen = fileChunkList.length

  const loadNextChunk = (index) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(fileChunkList[index].file) // 将文件二进制流进行读取
      reader.onload = (e) => {
        // 如果一个分片加载成功了
        count++
        // 此处确定是对每个分片进行md5
        spark.append(e.target.result) // 那么加入md5ArrayBuffer
        if(count === targetChunkLen){
          // 此时代表所有的分片都已经hash成功
          self.postMessage({
            percentage: 100,
            hash: spark.end()
          })
          self.close() // 关闭worker
        }else {
          // 此时是中间分片
          percentage = Math.floor(count / targetChunkLen * 100) //
          self.postMessage({
            percentage,
          }),
          loadNextChunk(count)
        }
      }
  }
  loadNextChunk(0)
}

