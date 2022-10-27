import { DRAG_ACTIONS_TYPE, DRAG_LIFEHOOKS_TYPE } from '@/stores/drag/types'
import createCreateEventEmitter from './configEvents/create-event'
import createEditEventEmitter from './configEvents/edit-event'

/*
 * @Date: 2022-10-20 17:00:40
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 15:58:25
 * @FilePath: \myroom\src\hooks\mouse-hook\config-event-emitter.ts
 * @description: none
 */
export function configEventEmitter(eventEmitter: any) {
  createCreateEventEmitter(eventEmitter) // 创建对于create事件需要有的钩子
  createEditEventEmitter(eventEmitter) // 创建对于edit事件需要有的钩子
}
