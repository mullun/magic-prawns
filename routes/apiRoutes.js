var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  //User Sign Up
  app.post("/signup", function(req, res){

    var useremail = req.body.useremail;
    var password = req.body.password;

    //User Email validation
    req.checkBody('useremail', 'User Email is required').notEmpty();
    req.checkBody('useremail', 'Email is no valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    //Set variable errors to pass to hbs object
    var errors = req.validationErrors();

    //Render the Signup page if errors exist, also pass the errors
    if(errors){
      var hbsObject = {
      title: "Sign Up - Magic Prawns",
      layout: "useraccount",
      errors: errors
      };

      res.render("signup", hbsObject);

    }else{
      console.log(req.body);

      db.User.create({
        user_email: req.body.useremail,
        password: req.body.password

      }).then(function() {

        req.flash("success_msg", "You are registered and can now login");
        /*res.redirect(307, "/login");*/
        res.redirect("/login");

      }).catch(function(err) {
        res.json(err);
      });
    }
  });

  //User Login
  app.post('/login',
    // The login form is submitted to the server via the POST method. Using authenticate() with the local strategy will handle the login request.
     passport.authenticate('local', { successRedirect: '/saved',
                                   failureRedirect: '/login',
                                   failureFlash: true }),

      function(req, res){
        //Redirect to user's saved page
        res.redirect('/saved');
  });

  //User Logout
  app.get('/logout', function(req, res){
    req.logout();
    req.flash("success_msg", "You have successfully logged out");
    res.redirect('/login');
  });


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

// user sends a dish to store in database
  app.post("/dish", function(req, res){
    db.Dish.findOne({
      where: {
        dish_name: req.body.dish_name,
        restaurant: req.body.restaurant,
        zip_code: req.body.zip_code
       }
    })
    .then(function(dbDish) {
      console.log("dbDish");
      console.log(dbDish);
      if(dbDish.length===1){
        console.log("dbDish");
        console.log(dbDish);
        //update meal table and average rating in dish table
        var dish_id = dbDish[0].id;  // get the ID of the dish from table
        var dish_rating = dbDish[0].rating;
        var newRating = (parseInt(dish_rating) + parseInt(req.body.rating)) / 2;
        var meal = {
          rating: req.body.rating,
          description: req.body.description,
          image: req.body.image,
          DishId: dish_id,
          UserId: req.body.user_id
        }
        db.Meal.create(meal);
        // update average rating in Dish Table
        db.Dish.update(
            {rating : newRating},
            {where:{DishId:dish_id}}
        );
        res.redirect("/saved");
      } 
      else if(dbDish.length===0) {  // dish being sent is new
       //update dishtable and then meal table
        db.Dish.create ({
          dish_name: req.body.dish_name,
          restaurant: req.body.restaurant,
          zip_code: req.body.zip_code,
          cuisine: req.body.cuisine,
          avg_rating: req.body.rating
        }).then(function(dbDishNew) {
          Dish.find(dbDishNew.id).then(function (dish_id_new) {
            db.Meal.create({
                UserId:req.body.user_id,
                DishId:dish_id_new,
                rating: req.body.rating,
                description: req.body.description,
                image: req.body.image
            }).then(function(dbMealNew) {
                  res.redirect("/saved");
            })
          });
        })
      }
        // res.json(dbDish);
    });
  });


};
