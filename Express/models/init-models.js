var DataTypes = require("sequelize").DataTypes;
var _blames = require("./blames");
var _repoowners = require("./repoowners");
var _repos = require("./repos");
var _test = require("./test");
var _urgencydescriptors = require("./urgencydescriptors");
var _users = require("./users");

function initModels(sequelize) {
  var blames = _blames(sequelize, DataTypes);
  var repoowners = _repoowners(sequelize, DataTypes);
  var repos = _repos(sequelize, DataTypes);
  var test = _test(sequelize, DataTypes);
  var urgencydescriptors = _urgencydescriptors(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  repos.belongsTo(repoowners, { as: "repo_owner", foreignKey: "repo_owner_id"});
  repoowners.hasMany(repos, { as: "repos", foreignKey: "repo_owner_id"});
  blames.belongsTo(repos, { as: "repo", foreignKey: "repo_id"});
  repos.hasMany(blames, { as: "blames", foreignKey: "repo_id"});
  blames.belongsTo(urgencydescriptors, { as: "urgency_descriptor", foreignKey: "urgency_descriptor_id"});
  urgencydescriptors.hasMany(blames, { as: "blames", foreignKey: "urgency_descriptor_id"});
  blames.belongsTo(users, { as: "blamed", foreignKey: "blamed_id"});
  users.hasMany(blames, { as: "blames", foreignKey: "blamed_id"});
  blames.belongsTo(users, { as: "blamer", foreignKey: "blamer_id"});
  users.hasMany(blames, { as: "blamer_blames", foreignKey: "blamer_id"});

  return {
    blames,
    repoowners,
    repos,
    test,
    urgencydescriptors,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
