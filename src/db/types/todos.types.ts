import { Document } from 'mongoose'
export interface IToDo {
  todoId: string
  content: string
  createTime: Date
  modifyTime: Date
  isFinish: number
}
export interface IToDoDocument extends IToDo, Document {}
