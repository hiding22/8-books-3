var express = require('express')
const shortid = require('shortid');

var db = require('../db');

var router = express.Router()

router.get("/", (request, response) => {
	response.render('books/index', {
		books: db.get('books').value()
	});
});	

router.get("/search", (request, response)=> {
	var q = request.query.q;
	var matched = db.get('books').value().filter(function (book) {
    	return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1; 
	});

	response.render('books/index', {
    books: matched
  });
});

router.get("/create", (req, res) => {
	res.render('books/create');
});

router.get('/:id/delete', (req, res) => {
	var id = req.params.id;

	var book = db.get('books').find({ id: id }).value();

	db.get('books')
	.remove({ id: book.id })
	.write();
	res.redirect('/books');
});

router.get('/:id/view', (req, res) => {
	var id = req.params.id;

	var book = db.get('books').find({ id: id }).value();
	res.render('books/view', {
		book: book
	})
});

router.get('/update/:id', (req, res) => { 
	res.render('books/update', {
		id: req.params.id
	});
});

router.post('/update/:id', (req, res) => {
	db.get('books')
	.find({ id: req.params.id })
	.assign({ title: req.body.title })
	.write();
	res.redirect("/books")
});

router.post("/create", (req, res) => {
	req.body.id = shortid.generate();
	db.get('books').push(req.body).write();
	res.redirect('/books');
});

module.exports = router;