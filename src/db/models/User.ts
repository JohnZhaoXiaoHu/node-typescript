import { DataTypes, Model } from 'sequelize';

import { sequelize } from '..';

class User extends Model {
  public id: number;
  public firstname: string;
  public lastname: string;
  public mail: string;
  public password: string;
  public phone: number;
}
User.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  // tslint:disable-next-line:object-literal-sort-keys
  firstname: {
    // allowNull defaults to true
    type: new DataTypes.STRING(),
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
