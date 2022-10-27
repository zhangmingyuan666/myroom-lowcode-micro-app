export function deepClone<T = any>(target: T): T {
  return JSON.parse(JSON.stringify(target))
}

// 节流函数:节约，在一定时间只执行一次

// 防抖函数：不抖的时候执行函数
// 如果发现有定时器，清除定时器并重新计时
export function debounce(fn: any, duration: number) {
  let timer: any = null

  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn(...args)
    }, duration)
  }
}
