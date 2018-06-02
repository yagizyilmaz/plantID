var express 	= require('express'),
router 		= express.Router(),
db 			= require('../db_connect');

function queryResults(query, res) {
	db.query(query, 
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
}

router.get('/resultlist', function(req, res) {
	queryResults('SELECT MediaId, Species FROM plant_cropped ORDER BY Species', res);
});

router.get('/filterresultlist', function(req, res) {
	var queryObj = req.query;
	var query = "SELECT MediaId, Species FROM plant_cropped";
	Object.keys(queryObj).forEach(function(key, i) {
		if (i === 0) {
			query += " WHERE";
		} else {
			query += " AND";
		}
		query += " " + Object.keys(queryObj)[i] + " " + queryObj[Object.keys(queryObj)[i]]; 
	});
	query += " ORDER BY Species";
	queryResults(query, res);
});

module.exports = router;