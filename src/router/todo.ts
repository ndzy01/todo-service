import * as express from 'express'
import model from '../db/model'
import utils from '../utils'
const todo = express.Router()

todo.post('/page', async function (req, res, next) {
  const page = parseInt(req.body.page)
  let todos = await model.ToDoModel.find(
    {
      isFinish: 0,
    },
    {
      _id: 0,
      todoId: 1,
      content: 1,
      createTime: 1,
      modifyTime: 1,
      isFinish: 1,
    }
  )
    .sort({ modifyTime: 1 })
    .skip((page - 1) * 10)
    .limit(10)
  const toDoList = []
  for (let i = 0; i < todos.length; i++) {
    const item = {
      todoId: todos[i].todoId,
      content: todos[i].content,
      createTime: utils.formatData(todos[i].createTime),
      modifyTime: utils.formatData(todos[i].modifyTime),
      isFinish: todos[i].isFinish,
    }
    toDoList.push(item)
  }
  const totalCount = (
    await model.ToDoModel.find({
      isFinish: 0,
    })
  ).length
  res.send({
    code: 0,
    msg: 'to-do list',
    data: toDoList,
    totalCount: totalCount,
  })
})

todo.post('/save', function (req: any, res, next) {
  model.ToDoModel.create({
    todoId: utils.getRandomCode(),
    content: req.body.content,
    createTime: new Date(),
    modifyTime: new Date(),
  }).then((result) => {
    res.send({
      code: 0,
      msg: 'ok！',
      data: null,
    })
  })
})

todo.post('/edit', function (req: any, res, next) {
  model.ToDoModel.updateOne(
    {
      todoId: req.body.todoId,
    },
    { $set: { content: req.body.content, modifyTime: new Date() } }
  ).then((result) => {
    res.send({
      code: 0,
      msg: 'ok！',
      data: null,
    })
  })
})

todo.post('/finish', function (req: any, res, next) {
  model.ToDoModel.updateOne(
    {
      todoId: req.body.todoId,
    },
    { $set: { isFinish: 1 } }
  ).then((result) => {
    res.send({
      code: 0,
      msg: 'ok！',
      data: null,
    })
  })
})

todo.post('/delete', function (req: any, res, next) {
  model.ToDoModel.deleteOne({
    todoId: req.body.todoId,
  }).then((result) => {
    res.send({
      code: 0,
      msg: 'ok！',
      data: null,
    })
  })
})

todo.post('/finishPage', async function (req, res, next) {
  const page = parseInt(req.body.page)
  let todos = await model.ToDoModel.find(
    {
      isFinish: 1,
    },
    {
      _id: 0,
      todoId: 1,
      content: 1,
      createTime: 1,
      modifyTime: 1,
    }
  )
    .sort({ createTime: -1 })
    .skip((page - 1) * 10)
    .limit(10)
  const toDoList = []
  for (let i = 0; i < todos.length; i++) {
    const item = {
      todoId: todos[i].todoId,
      content: todos[i].content,
      createTime: utils.formatData(todos[i].createTime),
      modifyTime: utils.formatData(todos[i].modifyTime),
      isFinish: todos[i].isFinish,
    }
    toDoList.push(item)
  }
  const totalCount = (
    await model.ToDoModel.find({
      isFinish: 1,
    })
  ).length
  res.send({
    code: 0,
    msg: 'to-do list',
    data: toDoList,
    totalCount: totalCount,
  })
})

export default todo
