import { Schema } from 'mongoose'
const ToDoSchema = new Schema({
  todoId: {
    type: String,
  },
  content: {
    type: String,
  },
  createTime: {
    type: Date,
  },
  modifyTime: {
    type: Date,
  },
  isFinish: {
    type: Number,
    default: 0,
  },
})

export default ToDoSchema
