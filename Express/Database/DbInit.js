const sql = require('mssql');
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_URL,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {

    trustServerCertificate: true 
  }
};

(async () => {
  try {
    await sql.connect(sqlConfig)
    const result = await sql.query`SELECT 1+1 AS result`;
    if(result.recordset[0].result==2) console.log("DB connected successfully!")

  } catch (err) {
    console.error(err);
  }
})();
module.exports= sqlConfig;