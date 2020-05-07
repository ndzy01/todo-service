import { model } from 'mongoose'
import schema from '../schema'
import { IToDoDocument } from '../types/todos.types'
export const ToDoModel = model<IToDoDocument>('todo', schema.ToDoSchema)
