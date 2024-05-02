const sql = require('mssql');
const sqlConfig = require('../Database/DbInit');

async function getOrCreateUserId(name) {
    try {
      // Make sure to connect to the database before calling the stored procedure
      await sql.connect(sqlConfig);
  
      // Create a new request
      const request = new sql.Request();
  
      // Add input parameter
      request.input('UserName', sql.VarChar, name);
  
      // Add output parameter
      // Execute the stored procedure
      const result=await request.execute('GetOrCreateUser');
      // Get the output parameter value
      const userId = result.recordset[0].UserId;
      return userId;
    } catch (err) {
      console.error('Error running stored procedure', err);
      throw err; // Rethrow the error for the caller to handle
    }
  }
  
module.exports={getOrCreateUserId}