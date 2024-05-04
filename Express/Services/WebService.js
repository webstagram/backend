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
  
module.exports={getWebsWithTopics};