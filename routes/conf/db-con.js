var mysql = require('mysql');
let connection = mysql.createConnection({
  user: 'root',
  password: 'mysql123',
  database: 'first_rest'
});

// DB 연결
connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});

module.exports = connection;
