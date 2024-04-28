const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('urgencydescriptors', {
    urgency_descriptor_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    urgency_descriptor_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'urgencydescriptors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "urgencydescriptors_pkey",
        unique: true,
        fields: [
          { name: "urgency_descriptor_id" },
        ]
      },
    ]
  });
};
