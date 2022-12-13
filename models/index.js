import fs from 'fs';
import Sequelize from 'sequelize';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv'
import userModel from './user.model.js';
import paymentModel from './payment.model.js';
import batchModel from './batch.model.js';
dotenv.config()
const __filename = fileURLToPath(import.meta.url);

const basename = path.basename(__filename);
const __dirname = path.dirname(__filename);
const db = {};
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: JSON.parse(process.env.SEQUELIZE_LOGGING) ? console.log : false,
    timezone: '+05:00',
  },
);
// console.log(sequelize);


fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.' !== 0) && file !== basename && file.slice(-3) === '.js'
    );
  });
  // fs.readdirSync(__dirname).filter(file => {
    //   return (
      //     file.indexOf('.' !== 0) && file !== basename && file.slice(-3) === '.js'
      //   );
      // // });
      // fs
      //   .readdirSync(__dirname)
      //   .filter(file => {
        //     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        //   })
        //   .forEach(file => {
          //     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
          //     db[model.name] = model;
          //   });
          db.user = userModel(sequelize, Sequelize.DataTypes);
          db.payment = paymentModel(sequelize, Sequelize.DataTypes);
          db.batch = batchModel(sequelize, Sequelize.DataTypes);

          db.user.hasMany(db.payment, {
            // as: 'comments',
            onDelete: 'cascade',
            onUpdate: 'NO ACTION',
          });
          db.payment.belongsTo(db.user);

          db.batch.hasMany(db.user, {
            // as: 'comments',
            onDelete: 'cascade',
            onUpdate: 'NO ACTION',
          });
          db.user.belongsTo(db.batch);
          
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
