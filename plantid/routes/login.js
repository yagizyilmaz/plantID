var express 	= require('express'),
//auth			= require('../auth'),
	router 		= express.Router();

router.get('/', function(req, res, next) {
	res.render('login', { title: 'plantID' });
});

router.post('/', function(req, res) {
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
});

module.exports = router;
