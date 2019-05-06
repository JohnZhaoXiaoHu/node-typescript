import { DataTypes, Model } from 'sequelize';

import { sequelize } from '..';

class User extends Model {}
User.init({
  // attributes
  user_firstname: {
    allowNull: false,
    type: new DataTypes.STRING(),
  },
  user_lastname: {
    type: new DataTypes.STRING()
    // allowNull defaults to true
  },
}, {
  modelName: 'users',
  sequelize,
  // options
});
export default User;
