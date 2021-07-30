import Sequelize from 'sequelize'

import config from '@src/db/config/config';

const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
