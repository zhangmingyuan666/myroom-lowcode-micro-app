/*
 * @Date: 2022-10-21 15:57:33
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 15:58:10
 * @FilePath: \myroom\src\hooks\mouse-hook\configEvents\create-event.ts
 * @description: none
 */
import { DRAG_ACTIONS_TYPE, DRAG_LIFEHOOKS_TYPE } from '@/stores/drag/types'

export default function createCreateEventEmitter(eventEmitter: any) {
  // 在create的时候
  eventEmitter.on(
    DRAG_ACTIONS_TYPE.CREATE_ELEMENT,
    DRAG_LIFEHOOKS_TYPE.MOUSE_UP,
    (e: MouseEvent, store: any) => {
      console.log('起始状态', e.offsetX, e.offsetY)
    }
  )

  // 先把create部分写了
  eventEmitter.on(
    DRAG_ACTIONS_TYPE.CREATE_ELEMENT,
    DRAG_LIFEHOOKS_TYPE.MOUSE_MOVE,
    (e: MouseEvent, store: any) => {
      //
      console.log('中间', e.offsetX, e.offsetY)
      console.log(eventEmitter)
    }
  )

  console.log(eventEmitter)
  // 先把create部分写了
  eventEmitter.on(
    DRAG_ACTIONS_TYPE.CREATE_ELEMENT,
    DRAG_LIFEHOOKS_TYPE.MOUSE_UP,
    (e: MouseEvent, store: any) => {
      const [left, top] = [
        e.offsetX - store.dragStartPosition.x,
        e.offsetY - store.dragStartPosition.y
      ]
      const target = e.target as HTMLElement
      const compid = target.getAttribute('compid') ?? ''
      // 在vuex里创建一个新的节点
      store.createNewComponent(store.currentComponentType, { left, top })
      store.insertNewComponent(compid)
    }
  )
}
