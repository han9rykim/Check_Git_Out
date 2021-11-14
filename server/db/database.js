const config = require("../db_config.json");
const mysql = require("mysql");
var pool = mysql.createPool(config);
function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
}

module.exports = getConnection;
