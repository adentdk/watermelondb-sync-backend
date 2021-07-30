'use strict'

import { Model, DataTypes } from 'sequelize'
import db from '../index'
import RoleAccess from './RoleAccess'

export default class Access extends Model {}

Access.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING(32)
  },
  path: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  icon: {
    allowNull: true,
    type: DataTypes.STRING(32)
  },
  type: {
    allowNull: false,
    type: DataTypes.ENUM('mobile', 'web', 'api')
  },
  details: {
    allowNull: true,
    type: DataTypes.STRING
  },
  is_active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: db.sequelize,
  name: 'Access',
  modelName: 'Access',
  tableName: 'accesses',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
})

Access.Roles = Access.belongsToMany(Roles, {
  as: 'roles',
  through: RoleAccess
})