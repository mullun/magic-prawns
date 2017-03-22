var express = require("express");
var router = express.Router();

var Dish = require("../models/dish.js")

app.get("/", function(req, res){
	var hbsObject = {
		Dish: data
	};
	res.render("index", hbsObject);
});