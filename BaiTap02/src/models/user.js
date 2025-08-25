"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // định nghĩa mối quan hệ ở đây (ví dụ: User.hasMany(Post))
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User", // tên model
      tableName: "Users", // bảng trong DB (CLI sẽ tạo bảng Users)
    }
  );

  return User;
};
