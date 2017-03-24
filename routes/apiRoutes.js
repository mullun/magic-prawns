var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({
      include: [db.Dish]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Dish]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/signup", function(req, res){
    db.User.findOne({
      where: {
        user_name: req.body.user_name
      }
    })
    .then(function(dbUser){
      if(dbUser.length===0){
        db.User.create(req.body);
        res.redirect("/");
      }else{
        return null;
      }
    });
  });

  app.post("/dish", function(req, res){
    db.Dish.findAll({
      where: {
        UserId: req.body.UserId,
        dish_name: req.body.dish_name,
        restaurant: req.body.restaurant,
        zip_code: req.body.zip_code
       }
    })
    .then(function(dbDish) {
      if(dbDish.length===1){
        //update meal table and average rating in dish table
        var meal = {
          dish_name: req.body.dish_name,
          rating: req.body.rating,
          description: req.body.description,
          image: req.body.image
         }
        db.Meal.create(meal);
      }else if(dbDish.length===0){
       //update dishtable and then meal table
        var dish = {
          dish_name: req.body.dish_name,
          restaurant: req.body.restaurant,
          zip_code: req.body.zip_code,
          cuisine: req.body.cuisine,
          avg_rating: req.body.rating
        };
        var meal = {
          dish_name: req.body.dish_name,
          rating: req.body.rating,
          description: req.body.description,
          image: req.body.image
        };
        db.Dish.create(dish);
        db.Meal.create(meal);
      }
        // res.json(dbDish);
      });
  });


};
