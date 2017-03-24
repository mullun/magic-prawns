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
};