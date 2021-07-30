'use strict'

import { Model, DataTypes } from 'sequelize'
import db from '../index'
import TodoItem from './TodoItem'

export default class Todo extends Model {}

Todo.init({
  title: {
    allowNull: false,
    type: DataTypes.STRING(64)
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
}, {
  sequelize: db.sequelize,
  name: 'Todo',
  modelName: 'Todo',
  tableName: 'todos',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
})

Todo.TodoItem = Todo.hasMany(TodoItem, {
  as: 'items'
})
