/*
 * @Date: 2022-10-19 22:54:29
 * @LastEditors: zhang-mingyuan123 2369558390@qq.com
 * @LastEditTime: 2022-10-21 15:53:03
 * @FilePath: \myroom\src\stores\drag\index.ts
 * @description: none
 */
import { defineStore } from 'pinia'
import state from './state'
import actions from './actions'
import {
  DRAG_ACTIONS_TYPE,
  DRAG_LIFEHOOKS_TYPE,
  IDragComponent,
  IDragComponentStyle
} from './types'
import EventEmitter from './event-emitter'
import { testList } from './data'
import {
  createRawNewComponentByType,
  findFatherComponent,
  removeComponent
} from './drag-utils'
import { DRAG_COMPONENT_TYPE } from '@/base-ui/drag-component'
import { deepClone } from '@/utils'

// 创造一个事件派发器，用于给不同的权限派发事件
export const eventEmitter = new EventEmitter()
export const useDragStore = defineStore('drag', {
  state: () => {
    return {
      dragStartPosition: {
        x: 0,
        y: 0
      },
      type: DRAG_ACTIONS_TYPE.NONE, // 定义当前组件的状态
      dragEventOptions: eventEmitter.emit(DRAG_ACTIONS_TYPE.NONE), // 用于向各种type注册回调,
      dragComponentList: testList(),
      currentComponentType: DRAG_COMPONENT_TYPE.TEXT, // 默认类型为文字
      currentComponentForm: createRawNewComponentByType()
    }
  },
  actions: {
    // 更改当前状态
    handleDragTypeChange(newType: DRAG_ACTIONS_TYPE) {
      this.type = newType
      this.dragEventOptions = eventEmitter.emit(newType)
    },
    setDragStartPosition(x: number, y: number) {
      ;[this.dragStartPosition.x, this.dragStartPosition.y] = [x, y]
    },
    // 插入全新节点到画布
    insertNewComponent(compid: string) {
      console.log('插入节点')
      if (compid) {
        const fatherComp = findFatherComponent(this.dragComponentList, compid)
        console.log(fatherComp)
        fatherComp.children.push(this.currentComponentForm)
      } else {
        this.dragComponentList.push(this.currentComponentForm as any)
      }
    },

    // 通过拖拽编辑已经存在的节点
    editComponentWithDrag(
      compid: string,
      options: Partial<IDragComponentStyle>
    ) {
      // 进行更新
      this.currentComponentForm.style = {
        ...this.currentComponentForm.style,
        ...options
      }
    },
    // 通过表单编辑已经存在的节点
    editComponentWithConfig(options: any) {
      console.log('通过Form编辑旧节点')
      const { content, left, top, height, width } = options
      this.currentComponentForm.style = { left, top, height, width }
      this.currentComponentForm.content = content
    },
    // 通过此方法，将currentForm通过compid进行更新：更新成当下选择的组件
    updateComponentFormByCompId(compid: string) {
      this.currentComponentForm = findFatherComponent(
        this.dragComponentList,
        compid
      ) // 首先把这个节点找到，设置为当前要找的节点
    },
    // 通过此方法，移除原本存在的节点，此时
    removeComponentByCompId(compid: string) {
      const needToRemove = findFatherComponent(this.dragComponentList, compid)
      this.currentComponentForm = deepClone(needToRemove) // 在form里保存一份深拷贝
      this.dragComponentList = removeComponent(this.dragComponentList, compid) // 将元素从list中移除
    },
    // 全新的component是无所谓Content的
    createNewComponent(
      type: DRAG_COMPONENT_TYPE,
      options: Partial<IDragComponentStyle>
    ) {
      const newObj = createRawNewComponentByType(type, options)
      this.currentComponentForm = newObj
    }
  }
})
