/*
 * @Date: 2022-10-20 13:12:11
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 16:05:10
 * @FilePath: \myroom\src\hooks\mouse-hook\index.ts
 * @description: none
 */
import { useDragStore, eventEmitter } from '@/stores/drag'
import {
  getDragStartCursorPosition,
  resumeDragTypeToNone
} from '@/stores/drag/drag-utils'
// 在这里注册一些事件捏
import { configEventEmitter } from './config-event-emitter'

// 注册eventListener的入口
function initEventEmitter() {
  configEventEmitter(eventEmitter)
}
initEventEmitter()

const useMouseActions = () => {
  const store = useDragStore()

  const { dragEventOptions: options } = storeToRefs(store)
  console.log(options)
  // down
  const onMouseDownToDrag = (e: MouseEvent) => {
    getDragStartCursorPosition(e, store) // 这是通用的方法
    if (options.value) {
      const { onMouseDownOptions } = options.value
      onMouseDownOptions.forEach((callbacks: any) => {
        callbacks(e, store)
      })
    }
  }

  // move
  const onMouseMoveToDrag = (e: MouseEvent) => {
    if (options.value) {
      const { onMouseMoveOptions } = options.value
      onMouseMoveOptions.forEach((callbacks: any) => {
        callbacks(e, store)
      })
    }
  }

  // up
  const onMouseUpToDrag = (e: MouseEvent) => {
    console.log(e, 'mouseUp')
    resumeDragTypeToNone(e, store) // 拖拽结束后将状态调整为None
    if (options.value) {
      const { onMouseUpOptions } = options.value
      onMouseUpOptions.forEach((callbacks: any) => {
        callbacks(e, store)
      })
    }
  }

  return {
    onMouseDownToDrag,
    onMouseMoveToDrag,
    onMouseUpToDrag
  }
}

export default useMouseActions
