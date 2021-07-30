'use strict'

import { Model, DataTypes } from 'sequelize'
import db from '../index'
import Access from './Access'
import RoleAccess from './RoleAccess'

export default class Role extends Model {}

Role.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING(32)
  },
}, {
  sequelize: db.sequelize,
  name: 'Role',
  modelName: 'Role',
  tableName: 'roles',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
})

Role.Accesses = Role.belongsToMany(Access, {
  as: 'accesses',
  through: RoleAccess
})
