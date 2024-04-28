const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('test', {
    user_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(39),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'test',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "test_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
