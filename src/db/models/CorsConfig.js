'use strict'

import { Model, DataTypes } from 'sequelize'
import db from '../index'

export default class CorsConfig extends Model {}

CorsConfig.init({
  origin: {
    allowNull: false,
    type: DataTypes.STRING
  },
}, {
  sequelize: db.sequelize,
  name: 'CorsConfig',
  modelName: 'CorsConfig',
  tableName: 'cors_configs',
  underscored: true,
  paranoid: true,
  timestamps: true,
  deletedAt: 'deleted_at'
})
