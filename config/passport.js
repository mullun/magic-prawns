var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

//Use passport local strategy
passport.use(new LocalStrategy(

	//By default, LocalStrategy expects to find credentials in parameters named username , here we are changing defaults to use email
	{
		usernameField: "email"
	},
  function(email, password, done) {

    db.User.findOne({ username: username }, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

