import { Sequelize } from 'sequelize';
import { DB_URL } from '../config';

export const sequelize = new Sequelize(DB_URL, {
  define: {
    // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
    // This was true by default, but now is false by default
    timestamps: false
  },
  logging: false
});
sequelize.sync();
