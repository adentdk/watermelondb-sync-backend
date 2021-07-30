'use strict'

import { DataTypes, Model } from 'sequelize'
import db from '../index'
import Role from './Role'

export default class User extends Model {}

User.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING(15)
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING(32)
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING(64)
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING(15)
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(64)
  },
  is_password_changed: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize: db.sequelize,
  name: 'User',
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
})

User.Role = User.belongsTo(Role, {
  as: 'role'
})