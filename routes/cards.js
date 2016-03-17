var express = require('express');
var router = express.Router();
var db = require("mysql");

var connection = require('../config/db');

router.get('/', function (req, res, next) {
	var query = "SELECT CardID, CategoryName, Question, Answer FROM card";
	// console.log("before format query: ",query)
	query = db.format(query);
	// console.log("after format  query: ",query)
	connection.query(query, function (err, card) {
		console.log("add card js")
		if(err) {
			res.status(400).send(err);
			return;
		}
			res.send(card);
	});

});

router.get('/:CardID', function (req, res, next) {
	var query = "SELECT * FROM card where cardId =" + req.params.CardID;
	query = db.format(query);

	connection.query(query, function (err, card) {
		console.log("add card js")
		if(err) {
			res.status(400).send(err);
			return;
		}
			res.send(card);
	});

});

router.post('/', function(req, res) {
	console.log('req.body: ', req.body);

	// SET is the values
	connection.query('INSERT INTO card SET ?', req.body, function (err, result) {
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
	var cardId = req.body.CardID;

	connection.query('DELETE FROM card WHERE cardId=' + cardId, req.body, function (err, result) {
		if(err) {
			res.status(400).send(err);
			return;
		}

		res.send(result);
	});
});

router.delete('/:CardID', function(req, res) {
	console.log('req.body: ', req.body);

	// SET is the values
	var cardId = req.params.CardID;

	connection.query('DELETE FROM card WHERE cardId=' + cardId, req.body, function (err, result) {
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
	var cardID = req.body.CardID;
	connection.query('UPDATE card SET ? where CardID=' + cardID, req.body, function (err, result) {
		if(err) {
			res.status(400).send(err);
			return;
		}

		res.send(result);
	});
});

router.put('/:CardID', function(req, res) {
	console.log('req.body: ', req.body);

	// SET is the values
	var cardID = req.params.CardID;
	connection.query('UPDATE card SET ? where CardID=' + cardID, req.body, function (err, result) {
		if(err) {
			res.status(400).send(err);
			return;
		}

		res.send(result);
	});
});


module.exports = router;