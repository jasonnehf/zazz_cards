'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'chproject',
	password: 'C0D1n9H0u$e',
	database: 'zazz_cards'
});

connection.connect(function (err) {
	if(err) {
		console.log('Error: ', err);
	} else {
		console.log('Connection success!');
	}
});

module.exports = connection;