'use strict'

import { Model } from 'sequelize'
import db from '../index'
import Access from './Access'
import Role from './Role'

export default class RoleAccess extends Model {}

RoleAccess.init({}, {
  sequelize: db.sequelize,
  name: 'RoleAccess',
  modelName: 'RoleAccess',
  tableName: 'role_access',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
})

RoleAccess.Role = RoleAccess.belongsTo(Role, {
  as: 'role'
})

RoleAccess.Access = RoleAccess.belongsTo(Access, {
  as: 'access'
})
