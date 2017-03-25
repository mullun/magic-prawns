var express = require("express");
var router = express.Router();

var db = require("../models")

module.exports = function(app){


  app.get("/", function(req, res){

      db.Dish.findAll({}).then(function(dbDish){
        var hbsObject = {
          Dish: dbDish,
          allTabisActive: true,
          searchTerm: req.query.search
        };
        res.render("index", hbsObject);
      });
    
  });

	app.get("/featured", function(req, res){

      db.Dish.findAll({
        order: [
          ["rating", "DESC"]
        ]
      }).then(function(dbDish){
    		var hbsObject = {
          Dish: dbDish,
    			featuredTabisActive: true
    			//searchTerm: req.query.search
    		};
    		res.render("index", hbsObject);
      });
    
	});

	// app.get("/featured", function(req, res){
 //  	db.Dish.findAll({
 //      order: [
 //        ["rating", "DESC"]
 //      ]
 //    }).then(function(dbDish){	
 //      console.log(dbDish)
 //      var hbsObject = {
 //  			Dish: dbDish,
 //  			featuredTabisActive: true
 //  		};
 //    });
	// 	res.render("index", hbsObject);
	// });

	app.get("/saved", function(req, res){
		var hbsObject = {
			Dish: "data",
			savedTabisActive: true,
			searchTerm: req.query.search
		};
		res.render("index", hbsObject);

	});

	// When user clicks on the Sign up link, render the signup handlebars and override the default layout to use useraccount.hbs
	app.get("/signup", function(req,res){

		var hbsObject = {
			title: "Sign Up - Magic Prawns",
			layout: "useraccount"
		};

		res.render("signup", hbsObject);
	});

	// When user clicks on the Login link, render the login handlebars and override the default layout to use useraccount.hbs
	app.get("/login", function(req,res){

		var hbsObject = {
			title: "Login - Magic Prawns",
			layout: "useraccount"
		};

		res.render("login", hbsObject);
	});

	app.get("/testdish/:dishName/:rating", function(req, res) {
    	db.Dish.create({
    		dish_name: req.params.dishName,
    	 	restaurant: "test restaurant",
    	 	rating: req.params.rating,
    	 	zip_code: 27516,
    	 	cuisine: "test cuisine"
    	}).then(function(dbUser){
    		res.json(dbUser);
    	});
  	});

	app.get("/testuser/:id/:password", function(req, res) {
    	db.User.create({
    		user_email: req.params.id,
        password: req.params.password
    	}).then(function(dbUser){
    		res.json(dbUser);
    	});
  	});
  
  app.get("/testmeal/:dish_id/:user_id", function(req, res) {
      db.Meal.create({
        UserId: req.params.user_id,
        DishId: req.params.dish_id,
        rating: 3,
        description: "Was good",
        meal_name: "Test meal",
        restaurant: "The worst",
        zip_code: 27516
      }).then(function(dbUser){
        res.json(dbUser);
      });
    });  

};