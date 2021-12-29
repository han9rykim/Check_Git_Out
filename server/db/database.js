const config = require("../db_config.json");
//db_config.json에 데이터베이스의 설명을 작성
const mysql = require("mysql");
//mysql을 import
var pool = mysql.createPool(config);
// mysql의 connection을 담을 pool을 생성
function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
}

// getConnection함수는 connection이 되어있는 것을 mysql pool에 저장한 후,

module.exports = getConnection;
