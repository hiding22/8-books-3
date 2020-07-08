var express = require('express')
const shortid = require('shortid');

var db = require('../db');

var router = express.Router()

router.get("/", (request, response) => {
	response.render('users/index', {
		users: db.get('users').value()
	});
});	

router.get("/search", (request, response)=> {
	var q = request.query.q;
	var matched = db.get('users').value().filter(function (user) {
    	return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1; 
	});

	response.render('users/index', {
    users: matched
  });
});

router.get("/create", (req, res) => {
	res.render('users/create');
});

router.get('/:id/delete', (req, res) => {
	var id = req.params.id;

	var book = db.get('users').find({ id: id }).value();

	db.get('users')
	.remove({ id: book.id })
	.write();
	res.redirect('/users');
});

router.get('/:id/view', (req, res) => {
	var id = req.params.id;

	var user = db.get('users').find({ id: id }).value();
	res.render('users/view', {
		user: user
	})
});

router.get('/update/:id', (req, res) => { 
	res.render('users/update', {
		id: req.params.id
	});
});

router.post('/update/:id', (req, res) => {
	db.get('users')
	.find({ id: req.params.id })
	.assign({ name: req.body.name })
	.write();
	res.redirect("/users")
});

router.post("/create", (req, res) => {
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
});


module.exports = router;