const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repos', {
    repo_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    repo_owner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'repoowners',
        key: 'repo_owner_id'
      }
    },
    repo_name: {
      type: DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'repos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "repos_pkey",
        unique: true,
        fields: [
          { name: "repo_id" },
        ]
      },
    ]
  });
};
