import { DRAG_COMPONENT_TYPE } from '@/base-ui/drag-component'

/*
 * @Date: 2022-10-20 14:03:55
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-20 18:03:57
 * @FilePath: \myroom\src\stores\drag\types.ts
 * @description: none
 */
export enum DRAG_ACTIONS_TYPE {
  NONE = 'none',
  CREATE_ELEMENT = 'create',
  EDIT_ELEMENT = 'edit',
  CONFIG_ELEMENT_SIZE = 'config-size'
}

export enum DRAG_LIFEHOOKS_TYPE {
  MOUSE_DOWN = 'onMouseDownOptions',
  MOUSE_MOVE = 'onMouseMoveOptions',
  MOUSE_UP = 'onMouseUpOptions'
}

export interface IDragList {
  name: string
  id: string
  width: number
  height: number
  children: IDragComponent[]
}

export interface IDragComponent {
  tag: DRAG_COMPONENT_TYPE
  id: string
  content: string
  style: IDragComponentStyle
  children: IDragComponent[]
}

export interface IDragComponentStyle {
  width: number
  height: number
  top: number
  left: number
}
