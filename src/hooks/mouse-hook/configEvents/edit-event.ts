import { DRAG_ACTIONS_TYPE, DRAG_LIFEHOOKS_TYPE } from '@/stores/drag/types'

/*
 * @Date: 2022-10-21 15:56:05
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 15:56:36
 * @FilePath: \myroom\src\hooks\mouse-hook\configEvents\edit-event.ts
 * @description: none
 */
export default function createEditEventEmitter(eventEmitter: any) {
  // 首先，我们放下：选择组件，获取当前组件
  eventEmitter.on(
    DRAG_ACTIONS_TYPE.EDIT_ELEMENT,
    DRAG_LIFEHOOKS_TYPE.MOUSE_DOWN,
    (e: MouseEvent, store: any) => {
      const target = e.target as HTMLElement
      const compid = target.getAttribute('compid')
      // 进行更新获取当前组件
      store.updateComponentFormByCompId(compid) // 设置一哈
    }
  )

  // Move的时候，改变left和top
  eventEmitter.on(
    DRAG_ACTIONS_TYPE.EDIT_ELEMENT,
    DRAG_LIFEHOOKS_TYPE.MOUSE_MOVE,
    (e: MouseEvent, store: any) => {
      // 更改当前组件的left和top
    }
  )

  // mouse_up的时候，将他插入or拿出
  eventEmitter.on(
    DRAG_ACTIONS_TYPE.EDIT_ELEMENT,
    DRAG_LIFEHOOKS_TYPE.MOUSE_UP,
    (e: MouseEvent, store: any) => {
      const target = e.target as HTMLElement
      const compid = target.getAttribute('compid') ?? '' // 这是来自于放置源的id
      const { id: sourceid } = store.currentComponentForm // 这是拖拽源的id
      const [left, top] = [
        e.offsetX - store.dragStartPosition.x,
        e.offsetY - store.dragStartPosition.y
      ]

      if (compid === sourceid) {
        // 说明自己拖拽到了自己上，应该只需要处理left和top的关系
        store.editComponentWithDrag(compid, {
          left: left + +store.currentComponentForm.style.left,
          top: +store.currentComponentForm.style.top + top
        })
        return
      }
      // 否则，拖拽到了其他地方，需要进行卸载后再加载
      store.removeComponentByCompId(sourceid)
      store.editComponentWithDrag(compid, { left, top })
      store.insertNewComponent(compid)
    }
  )
}
