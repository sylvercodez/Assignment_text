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
  var pollingUnit = req.query.pollingunit_uniqueid;
  var lga = req.query.lga;
  var partyAbbreviation = req.query.party_abbreviation;
  var partyScore = req.query.party_score;

  var sql =
    "INSERT INTO announced_lga_results (pollingunit_uniqueid, lga, party_abbreviation, party_score) VALUES (" +
    connection.escape(pollingUnit) +
    ", " +
    connection.escape(lga) +
    ", " +
    connection.escape(partyAbbreviation) +
    ", " +
    connection.escape(partyScore) +
    ")";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(
      "<h1>Results for polling unit " +
        pollingUnit +
        " successfully saved!</h1>"
    );
  });
});

//app listing to port 3000
app.listen(3000);
console.log("Server running at http://localhost:3000/");

connection.end();
