import { DataTypes, Model } from 'sequelize';

import { sequelize } from '..';

class User extends Model {}
User.init({
  // attributes
  firstname: {
    // allowNull defaults to true
    type: new DataTypes.STRING(),
  },
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  lastname: {
    type: new DataTypes.STRING()
  },
  mail: {
    allowNull: false,
    type: new DataTypes.STRING(),
  },
  password: {
    allowNull: false,
    type: new DataTypes.STRING(),
  },
  phone: {
    type: new DataTypes.NUMBER(),
  },
}, {
  modelName: 'users',
  sequelize,
  // options
});
export default User;
