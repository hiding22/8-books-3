var express = require('express')
const shortid = require('shortid');

var db = require('../db');

var router = express.Router();


router.get("/", (req, res) => {
	res.render('trans/index', {
		transactions: db.get('transactions').value()
	});
});

router.get('/:id/delete', (req, res) => {
	var id = req.params.id;

	var trans = db.get('transactions').find({ id: id }).value();

	db.get('transactions')
	.remove({ id: trans.id })
	.write();
	res.redirect('/transactions');
});

router.get("/create", (req, res) => {
	res.render('trans/create', {
		users: db.get('users').value(),
		books: db.get('books').value()
	});
});

router.post("/create", (req, res) => {
	req.body.id = shortid.generate();
	console.log(req.body);
	db.get('transactions').push(req.body).write();
	res.redirect('/transactions');
});

module.exports = router;