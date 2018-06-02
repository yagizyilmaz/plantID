var express 	= require('express'),
router 		= express.Router(),
db 			= require('../db_connect');

router.get('/resultlist', function(req, res) {
	//queryResults('SELECT MediaId, Species FROM plant_cropped ORDER BY Species', res);
	var obj = Object.keys(req.query)[0];
	db.query('SELECT MediaId, Species, ' + obj + ' FROM plant_cropped ORDER BY ' + obj, 
		function (err, result)  {
			if(err){
				throw err;
			} else {
				var objs = [];
				for (var i = 0;i < result.length; i++) {
					objs.push(result[i]);
				}
				res.end(JSON.stringify(objs));            
			}
		});
});

router.post('/update', function (req, res) {
	var obj = req.body;
	var attr = obj[0];
	var val = obj[1];
	var ids = obj[2];
	//console.log(attr);
	//console.log(val);
	//console.log(ids);
	for(var i = 0; i < ids.length; i++) {
		var query = "UPDATE plant_cropped SET " + attr +"='" + val + "' WHERE MediaId=" + ids[i];
		console.log(query);
		db.query(query, function(err) {
			if (err) throw err;
		});
	}
	res.end();
});

module.exports = router;