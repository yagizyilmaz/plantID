var express 		= require('express'),
	path 			= require('path'),
	favicon 		= require('serve-favicon'),
	logger 			= require('morgan'),
	cookieParser 	= require('cookie-parser'),
	bodyParser 		= require('body-parser'),
	db 				= require('./db_connect'),
	index 			= require('./routes/index'),
	results 		= require('./routes/results'),
	login			= require('./routes/login'),
    results_admin   = require('./routes/results_admin'),
	auth			= require('./auth'),
	mysql			= require('mysql');
	express_session = require('express-session'),
    passport 		= require('passport'),
    local_strategy 	= require('passport-local').Strategy,
	app 			= express();
	

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


// test database connection
db.query('USE plant_id', function (err) {
	if (err) console.log("CANNOT CONNECT TO DATABASE.\n");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/images/favicon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/////////////////////// auth stuff
app.use(express_session({
	secret: "something totally not secure, i guess.",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
////////////////////

var connection = mysql.createConnection({
	host     : 'host',
	user     : 'user',
	password : 'password'
});

connection.query('USE users');

passport.serializeUser(function(user, done) {
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
		connection.query("select * from users where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use(
        'local-login',
        new local_strategy({
            // by default, local strategy uses username and password, we will override with email
            username: 'username',
            password: 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
    	function(req, username, password, done) { // callback with email and password from our form

         connection.query("SELECT * FROM `users` WHERE `username` = '" + username + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false); // create the loginMessage and save it to session as flashdata
			
            // all is well, return successful user
            return done(null, rows[0]);			
		
		});
		


    }));

app.post("/login", passport.authenticate("local-login", {
    successRedirect: "/admin",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

///////////////////


app.use('/', index);
app.use('/results', results);
app.use('/login', login);
app.use('/results_admin', results_admin);

app.get('/admin', isLoggedIn, function(req, res, next) {
	res.render('admin', { title: 'plantID admin' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;