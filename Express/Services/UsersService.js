
const initModels=require("../models/init-models");
const sequelize=require("../models/Server");
const model=initModels(sequelize);
const {users}=model;
const getUserIDByUsername = async (username) => {
    try {
      let user = await users.findOne({ where: { user_name: username } });
      if (!user) {
        user = await users.create({ user_name: username });
      }
      return user.user_id;
    } catch (error) {
      console.error('Error getting data from DB:', error);
      throw error;
    }
  };
  
  module.exports = {
    getUserIDByUsername,
  };