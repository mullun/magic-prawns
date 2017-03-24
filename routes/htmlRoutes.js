var express = require("express");
var router = express.Router();

var db = require("../models")

module.exports = function(app){
	app.get("/", function(req, res){
	    db.Dish.findAll({})
	    .then(function(dbDish) {
	    //sort by rating	
	      res.json(dbDish);
	    });
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