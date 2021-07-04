const mySqlDriver = require("mysql2/promise");
const config = require("../config");

const query = async(sqlQuery,params)=>{
    const connection = await mySqlDriver.createConnection(config.db);
    const [results,] = await connection.execute(sqlQuery,params);

    return results;

}

module.exports= {
    query
}