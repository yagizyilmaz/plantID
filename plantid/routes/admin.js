var express 		= require('express'),
	router 			= express.Router(),
	auth		    = require('../auth'),
	db 				= require('../db_connect');

router.get('/', function(req, res, next) {
	res.render('admin', { title: 'plantID admin' });
});

module.exports = router;