const sql = require('mssql');
const sqlConfig = require('../Database/DbInit');

async function getOrCreatetUserId(username){
    try{
        await sql.connect(sqlConfig);
        let result= await sql.query`SELECT * FROM USERS`;
        return result.recordset;
    }
    catch{
    console.error('Error running query', err);
    throw err; // Rethrow the error for the caller to handle
    }
}

(async () => {
    let userId = await getOrCreatetUserId("fred");
    console.log(userId);
})();