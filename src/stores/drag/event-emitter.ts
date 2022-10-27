/*
 * @Date: 2022-10-20 15:04:02
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 11:11:55
 * @FilePath: \myroom\src\stores\drag\event-emitter.ts
 * @description: none
 */
import { eventEmitter } from '.'
import { DRAG_ACTIONS_TYPE, DRAG_LIFEHOOKS_TYPE } from './types'

export default class EventEmitter {
  events: any

  constructor() {
    this.events = {}
  }

  on(
    dragType: DRAG_ACTIONS_TYPE,
    mouseLifeHook: DRAG_LIFEHOOKS_TYPE,
    ...callbacks: any
  ) {
    if (!this.events[dragType]) {
      this.events[dragType] = {
        [DRAG_LIFEHOOKS_TYPE.MOUSE_DOWN]: new Set(),
        [DRAG_LIFEHOOKS_TYPE.MOUSE_MOVE]: new Set(),
        [DRAG_LIFEHOOKS_TYPE.MOUSE_UP]: new Set()
      }
    }

    // 将回调进行扁平化
    if (Array.isArray(callbacks)) {
      callbacks.forEach((callback) => {
        this.events[dragType][mouseLifeHook].add(callback)
      })
    } else {
      this.events[dragType][mouseLifeHook].add(callbacks)
    }
  }

  emit(dragType: DRAG_ACTIONS_TYPE) {
    return this.events[dragType]
  }
}
