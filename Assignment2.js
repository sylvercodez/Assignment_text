var express = require("express");
var app = express();
var mysql = require("mysql");
//To Create a MySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bincomphptest",
});

// To Connect to the MySQL server
connection.connect();

app.get("/", function (req, res) {
  //To Query the database for the results for all polling units in the local government
  var lga = req.query.lga;
  var sql =
    "SELECT SUM(pollingunit_uniqueid) as total FROM agentname WHERE lga = " +
    connection.escape(lga);
  connection.query(sql, function (err, result) {
    if (err) throw err;
   
    res.send("<h1>Total result for " + lga + ":</h1>");
    res.send("<p>" + result[0].total + "</p>");
  });
});
//app listing to port 3000
app.listen(3000);
console.log("Server running at http://localhost:3000/");

connection.end();
