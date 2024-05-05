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
      var postImages = [];
      var postIds = [];
      for (var post of posts){
        postIds.push(post.postId);
        const thisPostImages = (await request.query(`SELECT Path FROM Images WHERE PostId=(${post.PostId})`)).recordset;
        console.log(thisPostImages);
        post.PostImages = thisPostImages;
        thisPostImages.forEach(image =>{
          postImages.push(image);
        });
      }
      return posts;
    } catch (err) {
      console.error('Error getting posts', err);
      throw err; 
    }
  }
  
module.exports={getWebsWithTopics, getWebPosts};