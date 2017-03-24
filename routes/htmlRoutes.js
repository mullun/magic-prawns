var express = require("express");
var router = express.Router();

var db = require("../models")

module.exports = function(app){
	app.get("/", function(req, res){
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
};