import { DRAG_COMPONENT_TYPE } from '@/base-ui/drag-component'
import { IDragComponent } from './types'

/*
 * @Date: 2022-10-20 17:58:34
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 10:22:04
 * @FilePath: \myroom\src\stores\drag\data.ts
 * @description: none
 */
export function testList(): IDragComponent[] {
  return [
    {
      id: '1666259825532',
      content: '哈哈哈哈',
      tag: DRAG_COMPONENT_TYPE.TEXT,
      style: { left: 86, top: 20, width: 50, height: 50 },
      children: [
        {
          id: 'dcajjpcop',
          content: '哈哈哈哈',
          tag: DRAG_COMPONENT_TYPE.TEXT,
          style: { left: 59, top: 83, width: 50, height: 50 },
          children: []
        }
      ]
    },
    {
      id: '1666259841583',
      content: '哈哈哈哈',
      tag: DRAG_COMPONENT_TYPE.TEXT,
      style: { left: 0, top: 74, width: 50, height: 50 },
      children: []
    },
    {
      id: '1666259843281',
      content: '哈哈哈哈',
      tag: DRAG_COMPONENT_TYPE.TEXT,
      style: { left: 40, top: 160, width: 50, height: 50 },
      children: []
    }
  ]
}

// {
//   id: '1666259822863',
//   content: '哈哈哈哈',
//   tag: DRAG_COMPONENT_TYPE.TEXT,
//   style: { left: 75, top: 94, width: 50, height: 50 },
//   children: [
//     {
//       id: '1666259824439',
//       content: '哈哈哈哈',
//       tag: DRAG_COMPONENT_TYPE.TEXT,
//       style: { left: 95, top: 104, width: 50, height: 50 },
//       children: []
//     }
//   ]
// }
