const sql = require('mssql');
const sqlConfig = require('../Database/DbInit');

async function getOrCreateUserId(name, url="") {
    try {
      await sql.connect(sqlConfig);

      const request = new sql.Request();
  
      request.input('UserName', sql.VarChar, name);
      request.input('ProfileImageUrl', sql.VarChar,url)
  
      const result=await request.execute('GetOrCreateUser');

      const userId = result.recordset[0].UserId;
      return userId;
    } catch (err) {
      console.error('Error running stored procedure', err);
      throw err; 
    }
  }

async function getAllUsers() {
  try {
    await sql.connect(sqlConfig);

    const request = new sql.Request();
    const result = (await request.query('SELECT name FROM USERS')).recordset;
    
    return result;
  } catch (error) {
    console.err('Error getting all users', err);
    throw err;
  }
}
  
module.exports={getOrCreateUserId, getAllUsers};