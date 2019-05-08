import { Sequelize } from 'sequelize';
import { DB_URL } from '../config';

export const sequelize = new Sequelize(DB_URL, {
  define: {
    timestamps: false
  },
  logging: false
});
sequelize.sync();
