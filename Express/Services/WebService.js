const sql = require('mssql');
const sqlConfig = require('../Database/DbInit');

async function getWebsWithTopics(name, url="") {
    try {
      await sql.connect(sqlConfig);

      const request = new sql.Request();
      const result=await request.execute('GetWebsWithTopics');

      const userId = result.recordset;
      return userId;
    } catch (err) {
      console.error('Error running stored procedure', err);
      throw err; 
    }
  }

  async function getWebPosts(webId, url=""){
    if (!(Number.isInteger(webId))){
      var err = "webId is not an integer";
      throw(err);
    }
    try {
      await sql.connect(sqlConfig);
      const request = new sql.Request();
      // DESC will give the latest first
      var posts = (await request.query(`SELECT * FROM Posts WHERE WebId=${webId} ORDER BY TimeCreated DESC`)).recordset;
      
      for (var post of posts){
        const thisPostImages = (await request.query(`SELECT Path FROM Images WHERE PostId=(${post.PostId})`)).recordset;
        post.PostImages = thisPostImages;

        const thisPostTopic = (await request.query(`SELECT Name FROM Topics WHERE TopicId=(${post.TopicId})`)).recordset;
        post.Topic = thisPostTopic[0].Name;
      }
      return posts;
    } catch (err) {
      console.error('Error getting posts', err);
      throw err; 
    }
  }
  
module.exports={getWebsWithTopics, getWebPosts};