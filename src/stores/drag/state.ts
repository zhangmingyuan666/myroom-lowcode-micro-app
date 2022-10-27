import { DRAG_ACTIONS_TYPE, DRAG_LIFEHOOKS_TYPE } from './types'

/*
 * @Date: 2022-10-19 22:57:14
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 15:18:02
 * @FilePath: \myroom\src\stores\drag\state.ts
 * @description: none
 */
export default () => {
  return {
    dragStartPosition: {
      x: 0,
      y: 0
    },
    type: DRAG_ACTIONS_TYPE.NONE,
    dragEventOptions: {
      [DRAG_LIFEHOOKS_TYPE.MOUSE_DOWN]: [],
      [DRAG_LIFEHOOKS_TYPE.MOUSE_MOVE]: [],
      [DRAG_LIFEHOOKS_TYPE.MOUSE_UP]: []
    }
  }
}
