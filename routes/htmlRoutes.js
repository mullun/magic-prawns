var express = require("express");
var router = express.Router();

var db = require("../models")

module.exports = function(app){
	app.get("/", function(req, res){

	    // db.Dish.findAll({})
	    // .then(function(dbDish) {
	    // //sort by rating	
	    //   res.json(dbDish);
	    // });

		var hbsObject = {
			Dish: "data",
			allTabisActive: true,
			searchTerm: req.query.search
		};
		res.render("index", hbsObject);
	});

	app.get("/featured", function(req, res){
		var hbsObject = {
			Dish: "data",
			featuredTabisActive: true
		};
		res.render("index", hbsObject);
	});

	app.get("/saved", function(req, res){
		var hbsObject = {
			Dish: "data",
			savedTabisActive: true,
			searchTerm: req.query.search
		};
		res.render("index", hbsObject);

	});


	app.get("/api", function(req, res) {
    	// db.User.create({
    	// 	user_name: "tester"
    	// }).then(function(dbUser){
    	// 	res.json(dbUser);
    	// });

   //  	db.Dish.create({
   //  		dish_name: "test food",
   //  		restaurant: "test resto",
   //  		rating: 3,
   //  		zip_code: 27516,
   //  		cuisine: "test cuisine",
   //  		userId: 1
   //  	}).then(function(dbPost) {
   //    		res.json(dbPost);
   //  	});
  	// });
};