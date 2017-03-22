var express = require("express");
var router = express.Router();

var db = require("../models")

module.exports = function(app){
	app.get("/", function(req, res){
		var hbsObject = {
			Dish: data
		};
		res.render("index", hbsObject);
	});
};