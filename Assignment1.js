var express = require("express");
var app = express();
var mysql = require("mysql");

// To create a MySQL connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bincomphptest",
});

//To connect to the MySQL server
connection.connect();

app.get("/", function (req, res) {
     //To query the database for the results for the polling unit
  var pollingUnit = req.query.pollingunit_uniqueid;
 
  var sql =
    "SELECT * FROM agentname WHERE pollingunit_uniqueid = " +
    connection.escape(pollingUnit);
  connection.query(sql, function (err, results) {
   
    if (err) throw err;
    // Write the results to the response
    res.send("<h1>Results for polling unit " + pollingUnit + ":</h1>");
    for (var i = 0; i < results.length; i++) {
      res.send(
        "<p>" +
          results[i].firstname +
          " " +
          results[i].lastname +
          " (" +
          results[i].email +
          ") - " +
          results[i].phone +
          "</p>"
      );
    }
  });
});
//app listing to port 3000
app.listen(3000);
console.log("Server running at http://localhost:3000/");

connection.end();
