'use strict'

import { REGULAR_ROLE_ID } from '@src/constants'
import bcrypt from '@src/utils/bcrypt'
import { DataTypes, Model } from 'sequelize'
import uuid from 'uuid-v4'
import db from '../index'
import Role from './Role'

export default class User extends Model {}

User.init({
  name: {
    allowNull: false,
    type: DataTypes.STRING(32)
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
    type: DataTypes.STRING(64),
    set(value) {
      this.setDataValue('password', bcrypt.hash(value))
    }
  },
  is_active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  toResponse: {
    type: DataTypes.VIRTUAL,
    set: (value) => {
      throw new Error('cannot set toResponse value')
    }
  }
}, {
  sequelize: db.sequelize,
  name: 'User',
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at',
  getterMethods: {
    async toResponse() {
      const result = {
        id: this.id,
        name: this.name,
        username: this.username,
        email: this.email,
        phone: this.phone,
        is_password_changed: this.is_password_changed,
        is_active: this.is_active,
      }

      const role = await this.getRole()

      if (role) {
        result.role = {
          name: role.name
        }
      }

      return result;
    }
  },
  
})

User.beforeCreate(user => user.id = uuid())

User.Role = User.belongsTo(Role, {
  as: 'role'
})