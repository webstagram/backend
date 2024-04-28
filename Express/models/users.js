const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(39),
      allowNull: false,
      unique: "username_unique"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "username_unique",
        unique: true,
        fields: [
          { name: "user_name" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
