'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const bycrypt = require('bcrypt');

module.exports = (sequelize) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    user_type: DataTypes.ENUM,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
         if (value === this.password) {
          const hashPasspassword = bycrypt.hashSync(value, 10);
          this.setDataValue('password', hashPasspassword);
         } else {
          throw new Error("Password and confirm password is not equal.")
         }
      }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
    freezeTableName: true,
    paranoid: true,
  });
  return user;
};