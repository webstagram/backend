const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repoowners', {
    repo_owner_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    repo_owner_name: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      unique: "repo_owner_name_unique"
    }
  }, {
    sequelize,
    tableName: 'repoowners',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "repo_owner_name_unique",
        unique: true,
        fields: [
          { name: "repo_owner_name" },
        ]
      },
      {
        name: "repoowners_pkey",
        unique: true,
        fields: [
          { name: "repo_owner_id" },
        ]
      },
    ]
  });
};
