var express = require('express');
var router = express.Router();
var db = require("mysql");

var connection = require('../config/db');

router.get('/', function (req, res, next) {
	var query = "SELECT * FROM category";
	query = db.format(query);

	connection.query(query, function (err, category) {
		console.log("add category js")
		if(err) {
			res.status(400).send(err);
			return;
		}
			res.send(category);
	});

});


router.post('/', function(req, res) {
	console.log('req.body: ', req.body);

	// SET is the values
	connection.query('INSERT INTO category SET ?', req.body, function (err, result) {
		if(err) {
			res.status(400).send(err);
			return;
		}

		res.send(result);
	});
});

router.delete('/', function(req, res) {
	console.log('req.body: ', req.body);

	// SET is the values
	var CategoryID = req.body.CategoryID;

	connection.query('DELETE FROM category WHERE CategoryID=' + CategoryID, req.body, function (err, result) {
		if(err) {
			res.status(400).send(err);
			return;
		}

		res.send(result);
	});
});

router.put('/', function(req, res) {
	console.log('req.body: ', req.body);

	// SET is the values
	var CategoryID=req.body.CategoryID;
	connection.query('UPDATE category SET ? where CategoryID=' + CategoryID, req.body, function (err, result) {
		if(err) {
			res.status(400).send(err);
			return;
		}

		res.send(result);
	});
});


module.exports = router;