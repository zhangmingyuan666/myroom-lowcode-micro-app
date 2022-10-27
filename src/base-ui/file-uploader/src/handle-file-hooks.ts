const handleFile = () => {
  const transfromFileToArray = (file: any, size: number) => {
    const fileChunkList = []
    let cur = 0

    while (cur < file.size) {
      fileChunkList.push({
        file: file.slice(cur, cur + size)
      })
      cur += size
    }

    return fileChunkList
  }
  const transfromChunkToHashWidthWorker = (
    options: any,
    fileChunkList: any
  ) => {
    return new Promise((resolve, reject) => {
      options.value.worker = new Worker('/worker-hash.js')
      options.value.worker.postMessage({ fileChunkList }) // 此时告知给worker
      options.value.worker.onmessage = (e: any) => {
        const { percentage, hash } = e.data
        options.value.hashPercentage = percentage
        if (hash) {
          resolve(hash)
        }
      }
    })
  }

  return {
    transfromFileToArray,
    transfromChunkToHashWidthWorker
  }
}

export default handleFile
