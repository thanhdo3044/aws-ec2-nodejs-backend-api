import { Sequelize } from 'sequelize'
import { dbConfigDev } from './config'

const sequelize = new Sequelize(dbConfigDev.dataBaseName, dbConfigDev.userName, dbConfigDev.passWord, {
  host: dbConfigDev.host,
  port: dbConfigDev.port,
  dialect: dbConfigDev.dialect,
  dialectOptions: dbConfigDev.dialectOptions
})

export default sequelize
