'use strict'

import { Model, DataTypes } from 'sequelize'
import db from '../index'
import Todo from './Todo'

export default class TodoItem extends Model {}

TodoItem.init({
  title: {
    allowNull: false,
    type: DataTypes.STRING(64)
  },
  is_done: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize: db.sequelize,
  name: 'TodoItem',
  modelName: 'TodoItem',
  tableName: 'todo_items',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
})

TodoItem.Todo = TodoItem.belongsTo(Todo, {
  as: 'todo'
})
