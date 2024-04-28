const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blames', {
    blame_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    blamer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    blamed_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    urgency_descriptor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'urgencydescriptors',
        key: 'urgency_descriptor_id'
      }
    },
    repo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'repos',
        key: 'repo_id'
      }
    },
    blame_path: {
      type: DataTypes.STRING(4096),
      allowNull: false
    },
    blame_line: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blame_message: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    blame_accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    blame_complete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    blame_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'blames',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "blames_pkey",
        unique: true,
        fields: [
          { name: "blame_id" },
        ]
      },
    ]
  });
};
