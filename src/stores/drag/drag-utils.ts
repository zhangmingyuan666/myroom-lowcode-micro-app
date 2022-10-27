/*
 * @Date: 2022-10-20 16:02:56
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 11:39:45
 * @FilePath: \myroom\src\stores\drag\drag-utils.ts
 * @description: none
 */
import { DRAG_COMPONENT_TYPE } from '@/base-ui/drag-component'
import { DRAG_ACTIONS_TYPE, IDragComponent, IDragComponentStyle } from './types'

export function getDragStartCursorPosition(e: MouseEvent, store: any) {
  const { offsetX, offsetY } = e
  store.setDragStartPosition(offsetX, offsetY)
}

export function resumeDragTypeToNone(e: MouseEvent, store: any) {
  // 暂时令所有程序在最后都变成NONE
  const p = Promise.resolve()
  p.then(() => store.handleDragTypeChange(DRAG_ACTIONS_TYPE.NONE))
}

/**
 * @description: 此函数用于找到当前插入位置，也就是说之后的插入要在此节点的children进行插入
 * @param {IDragComponent} list 组件列表
 * @param {string} id 当前放置组件的id
 * @return {*}
 */
export function findFatherComponent(list: IDragComponent[], id: string) {
  let res: any = null
  list.forEach((listItem) => {
    if (res !== null) {
      return
    }

    if (listItem.children) res = findFatherComponent(listItem.children, id) // 找父亲的儿子
    if (listItem.id === id) res = listItem // 返回父亲
  })
  return res
}

// 我们如何处理com
/**
 * @description: 清除某个组件
 * @param {number} compid 组件的id
 * @return {*}
 */
export function removeComponent(
  list: IDragComponent[],
  compid: string
): IDragComponent[] {
  return list.filter((comp) => {
    if (comp.children) {
      comp.children = removeComponent(comp.children, compid)
    }

    return compid !== comp.id
  })
}

export function createRawNewComponentByType(
  type: DRAG_COMPONENT_TYPE = DRAG_COMPONENT_TYPE.TEXT,
  options: Partial<IDragComponentStyle> = { left: 0, top: 0 }
): IDragComponent {
  const { top, left } = options
  return {
    id: String(+new Date()),
    tag: type,
    content: '',
    style: {
      width: 50,
      height: 50,
      top: top ?? 0,
      left: left ?? 0
    },
    children: []
  }
}
